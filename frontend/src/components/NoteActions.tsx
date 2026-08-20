import { deleteNotes, deleteSingleNote, updateNotes, updateSingleNote } from "@/api/notes.api";
import { cn, toast } from "@/lib/utils";
import { PAGE_ROUTES } from "@/shared/constants";
import Icons from "@/shared/icons";
import useNotesStore from "@/store";
import type { Note } from "@/types/notes.type";
import { Archive, ArchiveRestore, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { mutate } from "swr";
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
  } = useNotesStore();

  const isArchivePage = pathname === PAGE_ROUTES.archive;
  const isTrashPage = pathname === PAGE_ROUTES.trash;

  const { trigger: updateNoteById } = useSWRMutation("/note/id", updateSingleNote, {
    onSuccess: () => {
      mutate("/notes");
      mutate("/notes/pinned");
      mutate("/notes/archived");
      mutate("/notes/trashed");
    }
  })

  const { trigger: updateNotesBulk } = useSWRMutation("/notes", updateNotes, {
    onSuccess: () => {
      mutate("/notes");
      mutate("/notes/pinned");
      mutate("/notes/archived");
      mutate("/notes/trashed");
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
      mutate(`/notes/trashed`)
      showToast("deleted permenantly");
      return;
    }
    if (note) {
      await updateNoteById({ id: note.id, updates: { isTrashed: true } });
    } else if (selectedNotes.length > 0) {
      await updateNotesBulk({ ids: selectedNotes, updates: { isTrashed: true } })
    }
    showToast("moved to trash");
  };

  const toggleArchive = async () => {
    if (note) {
      await updateNoteById({ id: note.id, updates: { isArchived: !note.isArchived } });

    } else if (selectedNotes.length > 0) {
      await updateNotesBulk({ ids: selectedNotes, updates: { isArchived: !isArchivePage } })
    }
    showToast(`${isArchivePage ? "Un" : ""}archived`);
  };

  const restoreTrash = async () => {
    if (note) {
      await updateNoteById({ id: note.id, updates: { isTrashed: false, isArchived: false } });
    } else if (selectedNotes.length > 0) {
      await updateNotesBulk({ ids: selectedNotes, updates: { isTrashed: false, isArchived: false } })
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
          {getArchiveButton(isArchivePage, showLabels ?? false)}
        </button>
      ) : (
        <button
          title="Restore"
          className="cursor-pointer"
          onClick={restoreTrash}
        >
          {showLabels ? "Restore" : <Icons.RestoreFromTrash size={20} />}
        </button>
      )}
      <button
        onClick={handleDelete}
        title={isTrashPage ? "Delete" : "Move to Trash"}
      >
        {showLabels ? (
          "Delete"
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
