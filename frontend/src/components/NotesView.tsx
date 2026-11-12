import type { Note } from "@/types/notes.type";
import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";
import React, { useEffect, useRef, useState } from "react";
import TextEditorDialog from "./TextEditor/TextEditorDialog";
import { MASONARY_BREAKPOINT_COLUMNS } from "@/shared/constants/constants";

const NotesView = React.memo(
  ({
    notes,
    title,
    loadMore = () => {},
  }: {
    notes: Note[];
    title?: string;
    loadMore?: () => void;
  }) => {
    const [openedNote, setOpenedNote] = useState<Note | null>();
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const element = observerRef.current;
      if (!element) {
        console.log("Element not found");
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore?.();
          }
        },
        {
          root: null,
          rootMargin: "200px 0px",
          threshold: 0.1,
        },
      );

      observer.observe(element);

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }, [loadMore]);

    return (
      <>
        <div className="flex flex-col gap-y-4">
          {title && (
            <p className="text-[#96918C] font-semibold text-xs uppercase">
              {title}
            </p>
          )}

          <Masonry
            breakpointCols={MASONARY_BREAKPOINT_COLUMNS}
            className="flex gap-4"
            columnClassName="flex flex-col gap-4"
          >
            {notes.map((note) => (
              <NoteCard
                note={note}
                key={note.id}
                setOpenedNote={setOpenedNote}
              />
            ))}
          </Masonry>
        </div>
        <div ref={observerRef} className="h-1" />
        {openedNote && (
          <TextEditorDialog
            onOpenChange={() => setOpenedNote(null)}
            note={openedNote}
          />
        )}
      </>
    );
  },
);

export default NotesView;
