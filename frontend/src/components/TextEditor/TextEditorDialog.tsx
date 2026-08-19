import { Dialog, DialogContent } from "@/ui/dialog";
import { useEffect } from "react";
import TextEditor from "./TextEditor";
import useNotesStore from "@/store";
import { PAGE_ROUTES } from "@/shared/constants";
import { Pin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NoteActions from "../NoteActions";
import { useLocation } from "react-router-dom";
import type { Note } from "@/types/notes.type";

const TextEditorDialog = ({
  noteId,
  onOpenChange,
}: {
  noteId: string;
  onOpenChange: (val: boolean) => void;
}) => {
  const { removeEmptyNotes, notes, pinUnpinNote } = useNotesStore();
  const { pathname } = useLocation();

  const note: Note = notes.find((note) => note.id === noteId)!;

  const handleOpenChange = (val: boolean) => {
    removeEmptyNotes();
    onOpenChange(val);
  };

  useEffect(() => {
    const html = document.documentElement;

    const observer = new MutationObserver(() => {
      html.style.removeProperty("scrollbar-gutter");
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  const noteActionClickHandler = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      handleOpenChange(false);
    }
  };

  return (
    <div>
      <Dialog open onOpenChange={handleOpenChange}>
        <DialogContent
          className="bg-white ring-0 p-0 sm:min-w-150 sm:h-auto   top-0 sm:top-1/2 translate-y-0 sm:-translate-y-1/2  max-h-dvh max-w-[unset] sm:w-100 sm:max-w-[calc(100%-2rem)]"
          overlayClasses="backdrop-blur-none bg-black/20"
          showCloseButton={false}
        >
          <TextEditor noteId={noteId} />
          <div className="absolute [&_button]:cursor-pointer [&_button]:text-gray-500 flex gap-x-2 top-3 right-3 shadow-2xl bg-white px-3 py-2 rounded-full">
            <div onClick={noteActionClickHandler}>
              <NoteActions noteId={noteId} />
            </div>
            {pathname === PAGE_ROUTES.notes && (
              <button>
                <Pin
                  size={20}
                  className={cn(note?.isPinned && "text-primary fill-primary")}
                  onClick={() => pinUnpinNote(noteId)}
                />
              </button>
            )}
            <button onClick={() => handleOpenChange(false)}>
              <X size={18} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TextEditorDialog;
