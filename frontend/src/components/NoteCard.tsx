import { cn } from "@/lib/utils";
import {
  NOTES_ACTION_COLOR_CLASS_MAP,
  NOTES_COLOR_CLASS_MAP,
  NOTES_TRASH_COLOR_CLASS_MAP,
  PAGE_ROUTES,
} from "@/shared/constants";
import useNotesStore from "@/store";
import type { Note, NoteColor } from "@/types/notes.type";
import { Pin, } from "lucide-react";
import { useLocation } from "react-router-dom";

import { BlockNoteView } from "@blocknote/mantine";
import "./TextEditor/editor.css";
import { ColorSelect } from "./TextEditor/Toolbar";
import NoteActions from "./NoteActions";
import useEditor from "@/hooks/useEditor";
import { mutate } from "swr";
import { updateSingleNote } from "@/api/notes.api";
import useSWRMutation from "swr/mutation";

const NoteCard = ({
  note,
  setOpenedNote,
}: {
  note: Note;
  setOpenedNote: (note: Note) => void;
}) => {
  const { title, image, color, type, content } = note;
  const { pathname } = useLocation();

  const editor = useEditor({
    type,
    content,
    isContentView: true
  })

  const isTrashPage = pathname === PAGE_ROUTES.trash;
  const isNotesPage = pathname === PAGE_ROUTES.notes;

  const { trigger: updateNoteById } = useSWRMutation("/note/id", updateSingleNote, {
    onSuccess: () => {
      mutate("/notes");
      mutate("/notes/pinned");
      mutate("/notes/archived");
      mutate("/notes/trashed");
    }
  })

  const {
    selectedNotes,
    selectNote,
    unselectNote,
    mobileSelectAllow,
  } = useNotesStore();

  const handleSelect = (checked: boolean, note: Note) => {
    if (checked) {
      const hasSelectedNote = selectedNotes.includes(note.id);

      if (!hasSelectedNote) {
        selectNote(note.id);
      }
      return;
    }

    unselectNote(note.id);
  };

  const handleColorChange = (color: NoteColor) => {
    updateNoteById({ id: note.id, updates: { color } });
  };



  const handlePinUnpin = () => {
    updateNoteById({ id: note.id, updates: { isPinned: !note.isPinned } });
  };

  return (
    <>
      <div
        className={cn(
          "md:min-w-55 h-fit p-3 md:p-6 md:pb-10 relative rounded-xl max-w-100 group  cursor-pointer transition-all duration-300",
          isTrashPage
            ? NOTES_TRASH_COLOR_CLASS_MAP[color]
            : NOTES_COLOR_CLASS_MAP[color],
        )}
      >
        <div onClick={() => setOpenedNote(note)}>
          {image && (
            <img
              src={image}
              alt={`${title}-note-image`}
              className="w-full mb-2 rounded-lg"
            />
          )}
          <p className="text-xl font-bold mb-2">{title}</p>
          <div className="note-view" onClick={() => setOpenedNote(note)}>
            <BlockNoteView
              editor={editor}
              editable={false}
              sideMenu={false}
              formattingToolbar={false}
              className="max-h-87.5 overflow-hidden"
              slashMenu={false}
              theme="light"
            />
          </div>
        </div>
        <div
          className={cn(
            "opacity-0 w-full group-hover:opacity-100 absolute inset-x-0 bottom-0 px-4 rounded-br-xl rounded-bl-xl text-slate-500 transform-opacity duration-200 flex justify-end gap-3",
            NOTES_ACTION_COLOR_CLASS_MAP[color],
          )}
        >
          <ColorSelect
            selectedColor={note.color}
            handleSelect={handleColorChange}
            className="[&_button]:px-0"
          />
          <NoteActions note={note} />
        </div>
        {isNotesPage && (
          <button
            className={cn(
              "absolute top-0 cursor-pointer  right-0 p-3  opacity-0 group-hover:opacity-100",
              note.isPinned && "opacity-100",
            )}
            onClick={handlePinUnpin}
          >
            <Pin
              className={cn(
                "transition-transform",
                note.isPinned
                  ? "w-4 h-4 text-[#E05A2B] fill-[#E05A2B]/50"
                  : "w-4.5 h-4.5 text-slate-500 opacity-0 group-hover:opacity-100",
              )}
            />
          </button>
        )}

        <input
          type="checkbox"
          checked={selectedNotes.includes(note.id)}
          className={cn(
            "note-checkbox absolute  opacity-0 cursor-pointer group-hover:opacity-100 -top-1 -left-1",
            (selectedNotes.length > 0 || mobileSelectAllow) && "opacity-100",
          )}
          onChange={(e) => {
            const value = e.target.checked;
            handleSelect(value, note);
          }}
        />
      </div>
    </>
  );
};

export default NoteCard;

// function showToast(title: string, action: string) {
//   const id = toast.add({
//     description: `Note ${title} is ${action}.`,
//     actionProps: {
//       onClick() {
//         toast.close(id);
//       },
//     },
//     type: "success",
//   });
// }
