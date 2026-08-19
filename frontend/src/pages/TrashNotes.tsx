import NotesPageLayout from "@/components/NotesPageLayout";
import NotesView from "@/components/NotesView";
import useNotesStore from "@/store";
import { useEffect } from "react";

const TrashNotes = () => {
  const { trashNotes, search } = useNotesStore();

  const notes = search.search ? search.results : trashNotes;

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <NotesPageLayout>
      <div className="flex flex-col gap-y-12 mt-10">
        <h1 className="text-4xl font-bold">Trash</h1>
        {notes.length ? (
          <NotesView notes={trashNotes} />
        ) : (
          <p>No items in trash</p>
        )}
      </div>
    </NotesPageLayout>
  );
};

export default TrashNotes;
