import { createElement, useEffect, useState } from "react";
import { Plus, SquareCheck, TextInitial as RichTextIcon } from "lucide-react";
import NotesPageLayout from "@/components/NotesPageLayout";
import NotesView from "@/components/NotesView";
import TextEditorDialog from "@/components/TextEditor/TextEditorDialog";
import useNotesStore from "@/store";
import type { Note } from "@/types/notes.type";
import { NoteType } from "@/types/enums";
import { cn } from "@/lib/utils";
import { NOTE_TYPE_OPTIONS } from "@/shared/text-editor.constant";

const Notes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [note, setNote] = useState<Note>();
  const [isNoteAddOpen, setIsNoteAddOpen] = useState<boolean>(false);
  const { notes, addNote, search } = useNotesStore();

  const baseNotes = search.search ? search.results : notes;
  const filteredNotes = baseNotes.filter(
    (note) => note.title || note.content || note.image,
  );

  const unArchivedNotes = filteredNotes.filter((note) => !note.isArchived);

  const pinnedNotes = unArchivedNotes.filter((note) => note.isPinned);

  const otherNotes = unArchivedNotes.filter((note) => !note.isPinned);

  const handleAddNote = (type: NoteType) => {
    const note = addNote(type);
    setNote(note);
    setIsDialogOpen(true);
    setIsNoteAddOpen(false);
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <NotesPageLayout>
        <div className="flex flex-col gap-y-18 mt-12.5 relative w-full">
          <div className="bg-white pl-6 pr-8 h-18.5 mx-auto [&_button]:hover:cursor-pointer rounded-xl flex justify-between text-[#96918C] max-w-134  w-full items-center">
            <button
              className="w-full text-left h-full"
              onClick={() => handleAddNote(NoteType.TEXT)}
            >
              Take a note
            </button>
            <div className="flex gap-x-8 items-center">
              <button onClick={() => handleAddNote(NoteType.LIST)}>
                <SquareCheck size={22} />
              </button>
              <button onClick={() => handleAddNote(NoteType.RICH_TEXT)}>
                <RichTextIcon size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-10">
            {pinnedNotes.length > 0 && <NotesView notes={pinnedNotes} />}
            {otherNotes.length > 0 && (
              <NotesView notes={otherNotes} title="other notes" />
            )}
            {unArchivedNotes.length === 0 && <p>No items</p>}
          </div>
          <div
            className={cn(
              "bg-primary shadow-[0_0_10px_2px_rgba(0,0,0,0.25)] sm:max-w-md max-w-[unset] text-white rounded-full transition-all ease-in sm:duration-500 duration-300 w-14 h-14 px-4 flex items-center justify-center fixed bottom-8 sm:right-8 right-4",
              isNoteAddOpen && "w-[calc(100%-32px)] sm:w-full justify-between",
            )}
          >
            {isNoteAddOpen &&
              NOTE_TYPE_OPTIONS.map((option) => (
                <button
                  className="flex gap-x-2 items-center cursor-pointer hover:bg-white/20 sm:px-4 py-2 rounded-full transition-all duration-300"
                  onClick={() => handleAddNote(option.value)}
                >
                  {createElement(option.icon, { size: 20 })}
                  <span>{option.label}</span>
                </button>
              ))}
            <button
              type="button"
              className="shrink-0 size-8 flex items-center justify-center cursor-pointer"
              onClick={() => setIsNoteAddOpen((prev) => !prev)}
            >
              <Plus
                className={cn(
                  "size-8 transition-all duration-300",
                  isNoteAddOpen && "rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </NotesPageLayout>
      {isDialogOpen && (
        <TextEditorDialog onOpenChange={setIsDialogOpen} noteId={note?.id!} />
      )}
    </>
  );
};

export default Notes;
