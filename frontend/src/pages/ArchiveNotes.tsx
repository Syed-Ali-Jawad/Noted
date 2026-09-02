import NotesView from "@/components/NotesView";
import useNotesStore from "@/store";
import { getArchivedNotes } from "@/api/notes.api";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const ArchiveNotes = () => {
  const { search } = useNotesStore();
  const {
    data: notes = [],
    isLoading,
    error,
  } = useSWR(["/notes/archived", search], ([, search]) =>
    getArchivedNotes(search),
  );

  if (error) {
    throw error;
  }

  return (
    <>
      <div className="flex flex-col gap-y-12 mt-10">
        <h1 className="text-4xl font-bold">Archive</h1>

        {isLoading ? (
          <Loader2 className="animate-spin mx-auto size-28 aspect-square text-gray-400 stroke-1" />
        ) : notes.length > 0 ? (
          <NotesView notes={notes} />
        ) : (
          <EmptyState description="No notes in archive" />
        )}
      </div>
    </>
  );
};

export default ArchiveNotes;
