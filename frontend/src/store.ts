import { create } from "zustand";
import type { Note } from "./types/notes.type";
import { MOCK_NOTES } from "./shared/constants";
import type { NoteType } from "./types/enums";

type Search = { search: string; results: Note[] };

interface Store {
  selectedNotes: string[];
  selectNote: (noteId: string) => void;
  unselectNote: (noteTitle: string) => void;
  resetNotesSelection: () => void;
  notes: Note[];
  trashNotes: Note[];
  addNote: (noteType: NoteType) => Note;
  updateNote: (note: Note) => void;
  toggleArchiveNotes: (noteIds: string[]) => void;
  pinUnpinNote: (noteId: string) => void;
  moveToTrash: (noteIds: string[]) => void;
  emptyTrash: () => void;
  deleteFromTrash: (noteIds: string[]) => void;
  restoreTrashedNotes: (noteIds: string[]) => void;
  removeEmptyNotes: () => void;
  search: Search;
  setSearch: (params: Search) => void;
  mobileSelectAllow: boolean;
  toggleMobileSelectAllow: () => void;
}
const useNotesStore = create<Store>((set) => ({
  selectedNotes: [],
  selectNote: (noteId: string) =>
    set((state) => ({ selectedNotes: [...state.selectedNotes, noteId] })),
  unselectNote: (noteId: string) =>
    set((state) => ({
      selectedNotes: state.selectedNotes.filter(
        (selectedNoteId) => selectedNoteId !== noteId,
      ),
    })),
  resetNotesSelection: () => set({ selectedNotes: [] }),
  notes: [...MOCK_NOTES],
  trashNotes: [],
  addNote: (type: NoteType) => {
    const note: Note = {
      id: crypto.randomUUID(),
      type,
      title: "",
      content: "",
      image: null,
      color: "white",
      createdAt: new Date().toISOString(),
      isArchived: false,
      archivedAt: null,
      isPinned: false,
    };
    set((state) => ({
      notes: [...state.notes, note],
    }));
    return note;
  },
  updateNote: (updatedNote: Note) =>
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
        return note;
      }),
    })),
  pinUnpinNote: (noteId: string) =>
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, isPinned: !note.isPinned };
        }
        return note;
      }),
    })),
  toggleArchiveNotes: (noteIds: string[]) =>
    set((state) => ({
      notes: state.notes.map((note) => {
        if (noteIds.includes(note.id)) {
          const newArchiveValue = !note.isArchived;
          return {
            ...note,
            isArchived: newArchiveValue,
            isPinned: false,
            archivedAt: newArchiveValue ? new Date().toISOString() : null,
          };
        }
        return note;
      }),
    })),
  moveToTrash: (noteIds: string[]) =>
    set((state) => {
      const deletedNotes: Note[] = [];
      return {
        notes: state.notes.filter((note) => {
          if (noteIds.includes(note.id)) {
            deletedNotes.push(note);
            return false;
          }
          return true;
        }),
        trashNotes: [...deletedNotes, ...state.trashNotes],
      };
    }),
  deleteFromTrash: (noteIds: string[]) =>
    set((state) => ({
      trashNotes: state.trashNotes.filter((note) => !noteIds.includes(note.id)),
    })),
  emptyTrash: () => set({ trashNotes: [] }),
  restoreTrashedNotes: (noteIds: string[]) => {
    const notesToRestore: Note[] = [];
    return set((state) => ({
      trashNotes: state.trashNotes.filter((note) => {
        if (noteIds.includes(note.id)) {
          notesToRestore.push(note);
          return false;
        }
        return true;
      }),
      notes: [
        ...state.notes,
        ...notesToRestore.map((note) => ({ ...note, isPinned: false })),
      ],
    }));
  },
  removeEmptyNotes: () =>
    set((state) => ({
      notes: state.notes.filter(
        (note) => note.title || note.content || note.image,
      ),
    })),
  search: { search: "", results: [] },
  setSearch: (val: Search) => set({ search: val }),
  mobileSelectAllow: false,
  toggleMobileSelectAllow: () =>
    set((state) => ({ mobileSelectAllow: !state.mobileSelectAllow })),
}));

export default useNotesStore;
