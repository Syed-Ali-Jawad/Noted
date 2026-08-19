import type { Note } from "@/types/notes.type";
import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";
import { useState } from "react";
import TextEditorDialog from "./TextEditor/TextEditorDialog";
import { MASONARY_BREAKPOINT_COLUMNS } from "@/shared/constants";


const NotesView = ({ notes, title }: { notes: Note[]; title?: string }) => {
  const [openedNoteId, setOpenedNoteId] = useState<string>("");
  const sortedNotes = notes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

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
          {sortedNotes.map((note) => (
            <NoteCard
              note={note}
              key={note.title}
              setOpenedNoteId={setOpenedNoteId}
            />
          ))}
        </Masonry>
      </div>
      {openedNoteId && (
        <TextEditorDialog
          onOpenChange={() => setOpenedNoteId("")}
          noteId={openedNoteId}
        />
      )}
    </>
  );
};

export default NotesView;
