import { create } from "zustand";


interface Store {
  selectedNotes: string[];
  selectNote: (noteId: string) => void;
  unselectNote: (noteTitle: string) => void;
  resetNotesSelection: () => void;

  search: string;
  setSearch: (params: string) => void;
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

  search: "",
  setSearch: (val: string) => set({ search: val }),
  mobileSelectAllow: false,
  toggleMobileSelectAllow: () =>
    set((state) => ({ mobileSelectAllow: !state.mobileSelectAllow })),
}));

export default useNotesStore;
