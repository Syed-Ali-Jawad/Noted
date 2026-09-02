import NotesView from "@/components/NotesView";
import useNotesStore from "@/store";
import { getTrashedNotes } from "@/api/notes.api";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const TrashNotes = () => {
  const { search } = useNotesStore();
  const {
    data: notes = [],
    isLoading,
    error,
  } = useSWR(["/notes/trashed", search], ([, search]) =>
    getTrashedNotes(search),
  );

  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-col gap-y-12 mt-10">
      <h1 className="text-4xl font-bold">Trash</h1>
      {isLoading ? (
        <Loader2 className="animate-spin mx-auto size-28 aspect-square text-gray-400 stroke-1" />
      ) : notes.length ? (
        <NotesView notes={notes} />
      ) : (
        <EmptyState description="No notes in trash" />
      )}
    </div>
  );
};

export default TrashNotes;
