import type { Note } from "@/types/notes.type";
import type { NotesPage } from "@/api/notes.api";

export type NotesCacheData = NotesPage | Note[];

const isNoteVisibleOnPage = (note: Note, path: string) => {
  if (!note.title && !note.content) return false;

  switch (path) {
    case "/notes/pinned":
      return note.isPinned && !note.isArchived && !note.isTrashed;
    case "/notes/archived":
      return note.isArchived && !note.isTrashed;
    case "/notes/trashed":
      return note.isTrashed;
    default:
      return !note.isPinned && !note.isArchived && !note.isTrashed;
  }
};

export const optimisticallyUpdateNotesPage = (
  data: NotesCacheData | undefined,
  path: string,
  search: string,
  ids: string[],
  updates: Partial<Note> = {},
  deleteNotes = false,
): NotesCacheData => {
  if (!data) {
    return path === "/notes/pinned" ? [] : { notes: [], totalNotes: 0 };
  }

  const searchTerm = search.trim().toLocaleLowerCase();
  const updateNote = (note: Note) =>
    ids.includes(note.id) ? { ...note, ...updates } : note;
  const shouldKeep = (note: Note) => {
    if (ids.includes(note.id) && deleteNotes) return false;

    const updatedNote = updateNote(note);
    const matchesSearch =
      !searchTerm ||
      `${updatedNote.title} ${updatedNote.content}`
        .toLocaleLowerCase()
        .includes(searchTerm);

    return matchesSearch && isNoteVisibleOnPage(updatedNote, path);
  };

  if (Array.isArray(data)) {
    return data.filter(shouldKeep).map(updateNote);
  }

  const notes = data.notes.filter(shouldKeep).map(updateNote);
  const removedCount = data.notes.length - notes.length;

  return {
    ...data,
    notes,
    totalNotes:
      typeof data.totalNotes === "number"
        ? Math.max(0, data.totalNotes - removedCount)
        : data.totalNotes,
  };
};
