import NotesView from "@/components/NotesView";
import useNotesStore from "@/store";
import { getTrashedNotes } from "@/api/notes.api";
import { Loader2 } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import useNotesInfinite from "@/hooks/useSWRInfinite";

const TrashNotes = () => {
  const { search } = useNotesStore();
  const {
    data = { notes: [], totalNotes: 0 },
    isLoading,
    error,
    loadMoreNotes,
  } = useNotesInfinite(["/notes/trashed", search], getTrashedNotes);

  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-col gap-y-12 mt-10">
      <h1 className="text-4xl font-bold">Trash</h1>
      {isLoading ? (
        <Loader2 className="animate-spin mx-auto size-28 aspect-square text-gray-400 stroke-1" />
      ) : data.notes.length ? (
        <NotesView notes={data.notes} loadMore={loadMoreNotes} />
      ) : (
        <EmptyState description="No notes in trash" />
      )}
    </div>
  );
};

export default TrashNotes;
