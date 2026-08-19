import NotesPageLayout from "@/components/NotesPageLayout";
import NotesView from "@/components/NotesView";
import useNotesStore from "@/store";
import { useEffect } from "react";

const ArchiveNotes = () => {
  const { notes, search } = useNotesStore();

  const baseNotes = search.search ? search.results : notes;

  const archivedNotes = baseNotes.filter((note) => note.isArchived);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <NotesPageLayout>
      <div className="flex flex-col gap-y-12 mt-10">
        <h1 className="text-4xl font-bold">Archive</h1>
        {archivedNotes.length > 0 ? (
          <NotesView notes={archivedNotes} />
        ) : (
          <p>No items in Archived</p>
        )}
      </div>
    </NotesPageLayout>
  );
};

export default ArchiveNotes;
