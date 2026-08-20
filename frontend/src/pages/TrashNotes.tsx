import NotesPageLayout from "@/components/NotesPageLayout";
import NotesView from "@/components/NotesView";
import useNotesStore from "@/store";
import { useEffect } from "react";
import { getTrashedNotes } from "@/api/notes.api";
import useSWR from "swr";
import { Loader2 } from "lucide-react";

const TrashNotes = () => {
  const { search } = useNotesStore();
  const { data: notes, isLoading } = useSWR(["/notes/trashed", search], ([, search]) => getTrashedNotes(search))

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <NotesPageLayout>
      <div className="flex flex-col gap-y-12 mt-10">
        <h1 className="text-4xl font-bold">Trash</h1>
        {isLoading ? <Loader2 className="animate-spin mx-auto size-28 aspect-square text-gray-400 stroke-1" /> : (notes || []).length ? (
          <NotesView notes={notes || []} />
        ) : (
          <p>No items in trash</p>
        )}
      </div>
    </NotesPageLayout>
  );
};

export default TrashNotes;
