import NotesPageLayout from "@/components/NotesPageLayout";
import NotesView from "@/components/NotesView";
import useNotesStore from "@/store";
import { useEffect } from "react";
import { getArchivedNotes } from "@/api/notes.api";
import useSWR, { mutate } from "swr";
import { Loader2 } from "lucide-react";

const ArchiveNotes = () => {
  const { search } = useNotesStore();
  const { data: notes, isLoading } = useSWR(["/notes/archived", search], ([, search]) => getArchivedNotes(search), {
    onSuccess: () => mutate(["/notes/archived", search])
  })


  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <NotesPageLayout>
      <div className="flex flex-col gap-y-12 mt-10">
        <h1 className="text-4xl font-bold">Archive</h1>

        {isLoading ? <Loader2 className="animate-spin mx-auto size-40 aspect-square text-gray-400 stroke-1" /> : (notes || []).length > 0 ? (
          <NotesView notes={notes || []} />
        ) : (
          <p>No items in Archived</p>
        )}
      </div>
    </NotesPageLayout>
  );
};

export default ArchiveNotes;
