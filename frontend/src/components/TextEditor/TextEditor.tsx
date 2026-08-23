import { BlockNoteView } from "@blocknote/mantine";
import "./editor.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Input } from "@/ui/input";
import CustomToolbar from "./Toolbar";
import { FormProvider, useForm } from "react-hook-form";
import { NoteType } from "@/types/enums";
import { cn, revalidate } from "@/lib/utils";
import { NOTES_COLOR_CLASS_MAP } from "@/shared/constants";
import type { Note } from "@/types/notes.type";
import { useEffect, useState } from "react";
import {
  checkListToMarkdown,
  normalizeContent,
} from "./utils";
import useEditor from "@/hooks/useEditor";
import useSWRMutation from "swr/mutation";
import { updateSingleNote } from "@/api/notes.api";

const defaultValues: Note = {
  id: "",
  title: "",
  content: "",
  type: NoteType.TEXT,
  color: "WHITE",
  image: null,
  isArchived: false,
  isPinned: false,
  isTrashed: false,
  archivedAt: null,
  createdAt: "",
};

const TextEditor = ({ note }: { note: Note }) => {
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

  const { trigger: updateNote, isMutating: isSaving } = useSWRMutation("/note/id", updateSingleNote, {
    onSuccess: () => {
      revalidate("/notes", "/notes/pinned", "/notes/archived", "/notes/trashed")
    }
  })

  const { title, color, type, image, content } = watch();

  const editor = useEditor({
    type,
    content: note.content,
    placeholder: "Take a note..."
  })

  useEffect(() => {
    const editorElement = document.querySelector(".note-editor");

    if (window.innerWidth > 640 || !editorElement) return;

    const handleBeforeInput = (event: Event) => {
      const inputEvent = event as InputEvent;

      if (inputEvent.inputType !== "insertParagraph") return;

      const { block } = editor.getTextCursorPosition();

      const isListItem =
        block.type === "checkListItem" ||
        block.type === "bulletListItem" ||
        block.type === "numberedListItem";

      if (isListItem) {
        event.preventDefault();

        const content = Array.isArray(block.content)
          ? block.content
          : [];

        const text = content
          .filter((item) => item.type === "text")
          .map((item) => item.text)
          .join("");

        const { state } = editor._tiptapEditor;
        const { from } = state.selection;

        const blockStart = state.doc.resolve(from).start();
        const offset = from - blockStart;

        const beforeText = text.slice(0, offset);
        const afterText = text.slice(offset);

        // Keep text before cursor in current item
        editor.updateBlock(block, {
          content: beforeText,
        });

        // Create same type of list item with remaining text
        const newBlock =
          block.type === "checkListItem"
            ? {
              type: "checkListItem" as const,
              content: afterText,
              props: {
                checked: false,
              },
            }
            : {
              type: block.type,
              content: afterText,
            };

        editor.insertBlocks(
          [newBlock],
          block.id,
          "after"
        );

        const blocks = editor.document;
        const currentIndex = blocks.findIndex(
          (b) => b.id === block.id
        );

        const nextBlock = blocks[currentIndex + 1];

        if (nextBlock) {
          editor.setTextCursorPosition(nextBlock.id, "start");
        }

        return;
      }

      // Everything else → soft line break
      event.preventDefault();

      const tiptap = editor._tiptapEditor;
      const { state, view } = tiptap;
      const { schema } = state;

      const hardBreak = schema.nodes.hardBreak;

      if (!hardBreak) return;

      const tr = state.tr.replaceSelectionWith(
        hardBreak.create()
      );

      view.dispatch(tr);
    };

    editorElement.addEventListener("beforeinput", handleBeforeInput);

    return () => {
      editorElement.removeEventListener("beforeinput", handleBeforeInput);
    };
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
      content,
      color: note.color,
      image: note.image,
    });
  }, [note.id]);


  useEffect(() => {
    if (!isDirty) {
      return; // Don't autosave until the form has actually changed
    }

    const timer = setTimeout(async () => {
      setShowSaving(true);


      await updateNote({
        id: note.id, updates: {
          title,
          content,
          image,
          type,
          color
        }
      });

      setShowSaving(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [title, color, content, image, type]);


  const handleContentChange = () => {
    if (isSaving) return;

    const markdown =
      type === NoteType.LIST
        ? checkListToMarkdown(editor.document)
        : editor.blocksToMarkdownLossy(editor.document);

    // BlockNote fires onChange during initialization,
    // so only update the form when the content actually changes.
    if (normalizeContent(content) === normalizeContent(markdown)) {
      return;
    }

    setValue("content", markdown, { shouldDirty: true });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Backspace") return;

    const { block } = editor.getTextCursorPosition();

    if (block.type !== "checkListItem") return;

    const text = block.content
      .filter((content) => content.type === "text")
      .map((content) => content.text)
      .join("");

    if (text !== "") return;

    event.preventDefault();

    editor.removeBlocks([block.id])
  };

  return (
    <FormProvider {...form}>
      <div
        className={cn(
          "min-w-0 w-full max-w-full  rounded-xl sm:pb-15 relative",
          NOTES_COLOR_CLASS_MAP[color],
        )}
      >
        <div className="min-w-0 w-full max-w-full flex flex-col p-3 pt-6 pb-0 px-0 sm:px-3 h-full max-h-[calc(100dvh-0.5rem)] sm:h-auto sm:max-h-[calc(100vh-11rem)] box-border overflow-auto scrollbar">
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
              onKeyDown={handleKeyDown}
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
