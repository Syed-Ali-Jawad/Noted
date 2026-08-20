import { deleteNotes, deleteSingleNote, updateNotes, updateSingleNote } from "@/api/notes.api";
import { cn, revalidate, toast } from "@/lib/utils";
import { PAGE_ROUTES } from "@/shared/constants";
import Icons from "@/shared/icons";
import useNotesStore from "@/store";
import type { Note } from "@/types/notes.type";
import { Archive, ArchiveRestore, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useSWRMutation from "swr/mutation";

const NoteActions = ({
  showLabels,
  note,
  className,
}: {
  showLabels?: boolean;
  note?: Note;
  className?: string;
}) => {
  const { pathname } = useLocation();
  const {
    selectedNotes,
    resetNotesSelection
  } = useNotesStore();

  const isArchivePage = pathname === PAGE_ROUTES.archive;
  const isTrashPage = pathname === PAGE_ROUTES.trash;

  const [bulkApiRunning, setBulkApiRunning] = useState<string>()


  const { trigger: updateNoteById } = useSWRMutation("/note/id", updateSingleNote, {
    onSuccess: () => revalidate("/notes", "/notes/pinned", "/notes/archived", "/notes/trashed")
  })

  const { trigger: updateNotesBulk } = useSWRMutation("/notes", updateNotes, {
    onSuccess: async () => {
      await revalidate("/notes", "/notes/pinned", "/notes/archived", "/notes/trashed");
      resetNotesSelection()
      setBulkApiRunning("")
    }
  })

  const showToast = (action: string) => {
    let message: string;
    if (!note) {
      message = `${selectedNotes.length} note${selectedNotes.length > 1 ? "s were" : " was"} ${action}.`;
    } else {
      message = `Note ${note.title ? `"${note.title}"` : ""} is ${action}.`
    }

    toast({
      message,
    });
  };

  const handleDelete = async () => {
    if (isTrashPage) {
      if (note) {
        await deleteSingleNote(note.id)
      } else if (selectedNotes.length > 0) {
        await deleteNotes({ arg: selectedNotes })
      }
      await revalidate("/notes/trashed")
      showToast("deleted permenantly");
      return;
    }
    if (note) {
      await updateNoteById({ id: note.id, updates: { isTrashed: true } });
    } else if (selectedNotes.length > 0) {
      setBulkApiRunning("move-to-trash")
      await updateNotesBulk({ ids: selectedNotes, updates: { isTrashed: true } })
    }
    showToast("moved to trash");
  };

  const toggleArchive = async () => {
    if (note) {
      await updateNoteById({ id: note.id, updates: { isArchived: !note.isArchived } });

    } else if (selectedNotes.length > 0) {
      setBulkApiRunning("archive")
      await updateNotesBulk({ ids: selectedNotes, updates: { isArchived: !isArchivePage } })
    }
    showToast(`${isArchivePage ? "Un" : ""}archived`);
  };

  const restoreTrash = async () => {
    if (note) {
      await updateNoteById({ id: note.id, updates: { isTrashed: false, isArchived: false } });
    } else if (selectedNotes.length > 0) {
      setBulkApiRunning("restore-trash")
      await updateNotesBulk({ ids: selectedNotes, updates: { isTrashed: false, isArchived: false, isPinned: false } })
    }
    showToast("restored");
  };

  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      {!isTrashPage ? (
        <button
          title={isArchivePage ? "Restore" : "Archive"}
          className="cursor-pointer"
          onClick={toggleArchive}
        >
          {showLabels ? <span className="inline-flex items-center gap-x-2">{bulkApiRunning === "archive" && <ActionLoader />} {getArchiveButton(isArchivePage, showLabels ?? false)}</span> : getArchiveButton(isArchivePage, showLabels ?? false)}
        </button>
      ) : (
        <button
          title="Restore"
          className="cursor-pointer"
          onClick={restoreTrash}
        >
          {showLabels ? <span className="inline-flex items-center gap-x-2">{bulkApiRunning === "restore-trash" && <ActionLoader />}Restore</span> : <Icons.RestoreFromTrash size={20} />}
        </button>
      )}
      <button
        onClick={handleDelete}
        title={isTrashPage ? "Delete" : "Move to Trash"}
      >
        {showLabels ? (
          <span className="inline-flex items-center gap-x-2">{(bulkApiRunning === "move-to-trash" && !isTrashPage) && <ActionLoader />}Delete</span>
        ) : (
          <Trash2 size={18} className="cursor-pointer" />
        )}
      </button>
    </div>
  );
};

export default NoteActions;

const getArchiveButton = (isArchivePage: boolean, showLabels: boolean) => {
  if (isArchivePage)
    return showLabels ? "Unarchive" : <ArchiveRestore size={18} />;

  return showLabels ? "Archive" : <Archive size={18} />;
};


const ActionLoader = () => <Loader2 className="animate-spin text-primary" size={18} />