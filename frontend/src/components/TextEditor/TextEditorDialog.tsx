import { Dialog, DialogContent } from "@/ui/dialog";
import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { PAGE_ROUTES } from "@/shared/constants";
import { Pin, X } from "lucide-react";
import { cn, revalidate } from "@/lib/utils";
import NoteActions from "../NoteActions";
import { useLocation } from "react-router-dom";
import type { Note } from "@/types/notes.type";
import useSWRMutation from "swr/mutation";
import { updateSingleNote } from "@/api/notes.api";

const TextEditorDialog = ({
  note,
  onOpenChange,
}: {
  note: Note;
  onOpenChange: (val: boolean) => void;
}) => {
  const { pathname } = useLocation();
  const [isPinned, setIsPinned] = useState<boolean>(note.isPinned)
  const { trigger: pinUnpinNote } = useSWRMutation("/note/id", updateSingleNote, {
    onSuccess: () => {
      revalidate("/notes/id", "/notes", "/notes/pinned")
    }
  })

  const handleOpenChange = (val: boolean) => {
    onOpenChange(val);
  };

  useEffect(() => {
    const html = document.documentElement;

    const isMobileView = window.innerWidth <= 640;

    const removeScrollbarGutter = () => {
      html.style.removeProperty("scrollbar-gutter");
    };

    // Remove anything already there
    removeScrollbarGutter();

    const observer = new MutationObserver(removeScrollbarGutter);

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["style"],
    });

    const handlePopState = () => {
      handleOpenChange(false);
    };

    if (isMobileView) {
      window.history.pushState({ editor: true }, "");
      window.addEventListener("popstate", handlePopState);
    }

    return () => { observer.disconnect(); if (isMobileView) window.removeEventListener("popstate", handlePopState); };
  }, []);

  const noteActionClickHandler = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      handleOpenChange(false);
    }
  };

  const handlePinUnpinNote = async () => {

    const newValue = !isPinned
    await pinUnpinNote({
      id: note.id, updates: {
        isPinned: newValue
      }
    })

    setIsPinned(newValue)
  }

  return (
    <div>
      <Dialog open onOpenChange={handleOpenChange}>
        <DialogContent
          className="bg-white ring-0 p-0 sm:min-w-150 sm:h-auto top-0 sm:top-1/2 translate-y-0 sm:-translate-y-1/2  max-h-dvh h-full  max-w-[unset] sm:w-100 sm:max-w-[calc(100%-2rem)]"
          overlayClasses="backdrop-blur-none bg-black/20"
          showCloseButton={false}
        >
          <TextEditor note={note} />
          <div className="absolute [&_button]:cursor-pointer [&_button]:text-gray-500 flex gap-x-2.5 sm:gap-x-2 top-3 right-3 shadow-2xl bg-white px-3 py-2 rounded-full">
            <div onClick={noteActionClickHandler}>
              <NoteActions note={note} className="gap-x-2.5 sm:gap-x-2" />
            </div>
            {pathname === PAGE_ROUTES.notes && (
              <button onClick={handlePinUnpinNote}>
                <Pin
                  size={18}
                  className={cn(isPinned && "text-primary fill-primary")}
                />
              </button>
            )}
            <button onClick={() => handleOpenChange(false)} className="hidden sm:block">
              <X size={18} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TextEditorDialog;
