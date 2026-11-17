import { deleteNotes, deleteSingleNote, updateNotes, updateSingleNote } from "@/api/notes.api";
import { cn, revalidate, toast } from "@/lib/utils";
import { PAGE_ROUTES } from "@/shared/constants/constants";
import Icons from "@/shared/icons";
import useNotesStore from "@/store";
import type { Note } from "@/types/notes.type";
import { Archive, ArchiveRestore, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import {
  optimisticallyUpdateNotesPage,
  type NotesCacheData,
} from "@/lib/notes-cache";

interface NoteActionsProps {
  showLabels?: boolean;
  note?: Note;
  className?: string;
  iconSize?: number;
}

const NoteActions = ({
  showLabels,
  note,
  className,
  iconSize = 18,
}: NoteActionsProps) => {
  const { pathname } = useLocation();
  const {
    selectedNotes,
    resetNotesSelection,
    search,
  } = useNotesStore();

  const isArchivePage = pathname === PAGE_ROUTES.archive;
  const isTrashPage = pathname === PAGE_ROUTES.trash;
  const pagePath =
    isTrashPage ? "/notes/trashed" : isArchivePage ? "/notes/archived" : "/notes";
  const cachePath =
    note && pagePath === "/notes" && note.isPinned
      ? "/notes/pinned"
      : pagePath;
  const cacheKey: [string, string] = [cachePath, search];

  const [bulkApiRunning, setBulkApiRunning] = useState<string>()


  const { trigger: updateNoteById } = useSWRMutation<
    unknown,
    Error,
    [string, string],
    { id: string; updates: Partial<Note> },
    NotesCacheData
  >(
    cacheKey,
    (_key, { arg }) => updateSingleNote("", { arg }),
    {
      onSuccess: () => revalidate("/notes", "/notes/pinned", "/notes/archived", "/notes/trashed"),
    },
  );
  const { trigger: updateNotesBulk } = useSWRMutation<
    unknown,
    Error,
    [string, string],
    { ids: string[]; updates: Partial<Note> },
    NotesCacheData
  >(
    cacheKey,
    (_key, { arg }) => updateNotes("", { arg }),
    {
      onSuccess: async () => {
        await revalidate("/notes", "/notes/pinned", "/notes/archived", "/notes/trashed");
        resetNotesSelection()
        setBulkApiRunning("")
      },
    },
  );
  const { trigger: deleteNoteById } = useSWRMutation<
    void,
    Error,
    [string, string],
    string,
    NotesCacheData
  >(
    cacheKey,
    (_key, { arg }: { arg: string }) => deleteSingleNote(arg),
    {
      onSuccess: () => revalidate("/notes/trashed"),
    },
  );
  const { trigger: deleteNotesBulk } = useSWRMutation<
    void,
    Error,
    [string, string],
    string[],
    NotesCacheData
  >(
    cacheKey,
    (_key, { arg }: { arg: string[] }) => deleteNotes({ arg }),
    {
      onSuccess: () => revalidate("/notes/trashed"),
    },
  );

  const optimisticOptions = (ids: string[], updates: Partial<Note> = {}, remove = false) => ({
    optimisticData: (currentData: Parameters<typeof optimisticallyUpdateNotesPage>[0]) =>
      optimisticallyUpdateNotesPage(currentData, cachePath, search, ids, updates, remove),
    rollbackOnError: true,
    revalidate: false,
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
        await deleteNoteById(note.id, optimisticOptions([note.id], {}, true))
      } else if (selectedNotes.length > 0) {
        await deleteNotesBulk(selectedNotes, optimisticOptions(selectedNotes, {}, true))
      }
      showToast("deleted permenantly");
      return;
    }
    if (note) {
      await updateNoteById(
        { id: note.id, updates: { isTrashed: true } },
        optimisticOptions([note.id], { isTrashed: true }),
      );
    } else if (selectedNotes.length > 0) {
      setBulkApiRunning("move-to-trash")
      await updateNotesBulk(
        { ids: selectedNotes, updates: { isTrashed: true } },
        optimisticOptions(selectedNotes, { isTrashed: true }),
      )
    }
    showToast("moved to trash");
  };

  const toggleArchive = async () => {
    if (note) {
      const updates = { isArchived: !note.isArchived };
      await updateNoteById(
        { id: note.id, updates },
        optimisticOptions([note.id], updates),
      );

    } else if (selectedNotes.length > 0) {
      setBulkApiRunning("archive")
      const updates = { isArchived: !isArchivePage };
      await updateNotesBulk(
        { ids: selectedNotes, updates },
        optimisticOptions(selectedNotes, updates),
      )
    }
    showToast(`${isArchivePage ? "Un" : ""}archived`);
  };

  const restoreTrash = async () => {
    if (note) {
      const updates = { isTrashed: false, isArchived: false };
      await updateNoteById(
        { id: note.id, updates },
        optimisticOptions([note.id], updates),
      );
    } else if (selectedNotes.length > 0) {
      setBulkApiRunning("restore-trash")
      const updates = { isTrashed: false, isArchived: false, isPinned: false };
      await updateNotesBulk(
        { ids: selectedNotes, updates },
        optimisticOptions(selectedNotes, updates),
      )
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
          {showLabels ? <span className="inline-flex items-center gap-x-2">{bulkApiRunning === "restore-trash" && <ActionLoader />}Restore</span> : <Icons.RestoreFromTrash size={iconSize + 2} />}
        </button>
      )}
      <button
        onClick={handleDelete}
        title={isTrashPage ? "Delete" : "Move to Trash"}
      >
        {showLabels ? (
          <span className="inline-flex items-center gap-x-2">{(bulkApiRunning === "move-to-trash" && !isTrashPage) && <ActionLoader />}Delete</span>
        ) : (
          <Trash2 size={iconSize} className="cursor-pointer" />
        )}
      </button>
    </div>
  );
};

export default NoteActions;

const getArchiveButton = (isArchivePage: boolean, showLabels: boolean, iconSize: number = 18) => {
  if (isArchivePage)
    return showLabels ? "Unarchive" : <ArchiveRestore size={iconSize} />;

  return showLabels ? "Archive" : <Archive size={iconSize} />;
};


const ActionLoader = () => <Loader2 className="animate-spin text-primary" size={18} />