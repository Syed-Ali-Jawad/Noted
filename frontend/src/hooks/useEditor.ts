import { NoteType } from "@/types/enums";
import { getInitialContent, getSchema, parseChecklist } from "@/components/TextEditor/utils";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

const useEditor = ({ type, content, placeholder, isContentView = false }: { type: NoteType, content: string, placeholder?: string, isContentView?: boolean }) => {
    const editor = useCreateBlockNote(
        {
            schema: getSchema(type),
            ...(placeholder && {
                placeholders: {
                    default: placeholder,
                },
            }),
            initialContent: getInitialContent(type),
        },
        [type],
    );

    const dependency = [editor, ...(isContentView ? [content] : [])]

    useEffect(() => {
        const blocks =
            type === NoteType.LIST
                ? parseChecklist(content)
                : editor.tryParseMarkdownToBlocks(content);

        editor.replaceBlocks(editor.document, blocks);
    }, dependency);

    return editor;
}

export default useEditor