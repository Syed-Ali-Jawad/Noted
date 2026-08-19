import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "./editor.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Input } from "@/ui/input";
import CustomToolbar from "./Toolbar";
import { FormProvider, useForm } from "react-hook-form";
import { NoteType } from "@/types/enums";
import { cn } from "@/lib/utils";
import { NOTES_COLOR_CLASS_MAP, PAGE_ROUTES } from "@/shared/constants";
import type { Note } from "@/types/notes.type";
import { useEffect, useState } from "react";
import {
  checkListToMarkdown,
  getInitialContent,
  getSchema,
  parseChecklist,
} from "./utils";
import useNotesStore from "@/store";
import { useLocation } from "react-router-dom";

const defaultValues: Note = {
  id: "",
  title: "",
  content: "",
  type: NoteType.TEXT,
  color: "white",
  image: null,
  isArchived: false,
  isPinned: false,
  archivedAt: null,
  createdAt: "",
};

const TextEditor = ({ noteId }: { noteId: string }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSaving, setShowSaving] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<Note>({
    defaultValues,
  });

  const {
    register,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = form;

  const { updateNote, notes, trashNotes } = useNotesStore();
  const { pathname } = useLocation();

  const baseNotes = pathname === PAGE_ROUTES.trash ? trashNotes : notes;

  const note: Note = baseNotes.find((note) => note.id === noteId)!;

  const { title, color, type, image, content } = watch();

  const editor = useCreateBlockNote(
    {
      schema: getSchema(type),
      placeholders: {
        default: "Take a note...",
      },
      initialContent: getInitialContent(type),
    },
    [type],
  );

  useEffect(() => {
    const blocks =
      type === NoteType.LIST
        ? parseChecklist(note.content)
        : editor.tryParseMarkdownToBlocks(note.content);

    editor.replaceBlocks(editor.document, blocks);
  }, [editor]);

  useEffect(() => {
    if (!image) {
      setImageUrl(null);
      return;
    }

    // if image is already as string means url no need to convert file to url
    if (typeof image === "string") {
      setImageUrl(image);
      return;
    }

    const url = URL.createObjectURL(image);
    setImageUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  useEffect(() => {
    reset({
      type: note.type,
      title: note.title,
      content: note.content,
      color: note.color,
      image: note.image,
    });
  }, []);

  useEffect(() => {
    if (!isDirty) {
      return; // Don't autosave until the form has actually changed
    }

    const timer = setTimeout(async () => {
      setIsSaving(true);
      setShowSaving(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      updateNote({
        ...note,
        title,
        content,
        image,
        type,
        color,
      });

      setIsSaving(false);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowSaving(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [title, color, content, image, type]);

  const handleContentChange = () => {
    const markdown =
      type === NoteType.LIST
        ? checkListToMarkdown(editor.document)
        : editor.blocksToMarkdownLossy(editor.document);

    // BlockNote fires onChange during initialization,
    // so only update the form when the content actually changes.
    if (content === markdown) {
      return;
    }

    setValue("content", markdown, { shouldDirty: true });
  };

  return (
    <FormProvider {...form}>
      <div
        className={cn(
          "min-w-0 w-full max-w-full rounded-xl sm:pb-15 relative",
          NOTES_COLOR_CLASS_MAP[color],
        )}
      >
        <div className="min-w-0 w-full max-w-full flex flex-col p-3 pt-6 pb-0 px-3 max-h-[calc(100dvh-0.5rem)] sm:max-h-[calc(100vh-11rem)] box-border overflow-auto scrollbar">
          {imageUrl && (
            <img
              src={imageUrl}
              className="w-full max-w-full mb-4 h-full object-cover object-top rounded-lg"
            />
          )}

          <Input
            className="w-full min-w-0 max-w-full focus-visible:ring-0 px-3 placeholder:text-gray-400 placeholder:font-normal focus-visible:border-none border-none lg:text-[26px] text-[26px] font-bold"
            placeholder="Title"
            {...register("title")}
          />

          <div className="note-editor min-w-0 w-full max-w-full mt-2 [&_.bn-editor]:min-h-[50dvh]! [&_.bn-editor]:lg:min-h-20! [&_.bn-editor]:px-3! [&_.bn-editor]:max-w-full [&_.bn-editor]:min-w-0">
            <BlockNoteView
              editor={editor}
              formattingToolbar={false}
              theme="light"
              className="w-full min-w-0 max-w-full rounded-2xl"
              sideMenu={false}
              onChange={handleContentChange}
            >
              <CustomToolbar isSaving={isSaving} showSaving={showSaving} />
            </BlockNoteView>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default TextEditor;
