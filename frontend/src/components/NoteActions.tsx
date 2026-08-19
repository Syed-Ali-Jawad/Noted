import { cn, toast } from "@/lib/utils";
import { PAGE_ROUTES } from "@/shared/constants";
import Icons from "@/shared/icons";
import useNotesStore from "@/store";
import { Archive, ArchiveRestore, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const NoteActions = ({
  showLabels,
  noteId,
  className,
}: {
  showLabels?: boolean;
  noteId?: string;
  className?: string;
}) => {
  const { pathname } = useLocation();
  const {
    toggleArchiveNotes,
    restoreTrashedNotes,
    deleteFromTrash,
    moveToTrash,
    notes,
    trashNotes,
    selectedNotes,
  } = useNotesStore();

  const isArchivePage = pathname === PAGE_ROUTES.archive;
  const isTrashPage = pathname === PAGE_ROUTES.trash;

  const targetNote: string[] = noteId ? [noteId] : selectedNotes;

  const title = (isTrashPage ? trashNotes : notes).find(
    (note) => note.id === noteId,
  )?.title;

  const showToast = (action: string) => {
    let message = title ? `Note "${title}" is ${action}.` : "";

    if (selectedNotes.length > 0)
      message = `${selectedNotes.length} note${selectedNotes.length > 1 ? "s were" : " was"} ${action}.`;

    toast({
      message,
    });
  };

  const handleDelete = () => {
    if (isTrashPage) {
      deleteFromTrash(targetNote);
      showToast("deleted permenantly");
      return;
    }

    moveToTrash(targetNote);
    showToast("moved to trash");
  };

  const toggleArchive = () => {
    toggleArchiveNotes(targetNote);
    showToast(`${isArchivePage ? "Un" : ""}archived`);
  };

  const restoreTrash = () => {
    restoreTrashedNotes(targetNote);
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
