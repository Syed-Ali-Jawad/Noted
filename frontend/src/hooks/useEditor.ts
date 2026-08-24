import { NoteType } from "@/types/enums";
import { getInitialContent, getSchema, parseChecklist } from "@/components/TextEditor/utils";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

interface editorProps {
    type: NoteType,
    content: string,
    placeholder?: string,
    isContentView?: boolean
}

const useEditor = ({ type, content, placeholder, isContentView = false }: editorProps) => {
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
        if (!content) return;
        const blocks =
            type === NoteType.LIST
                ? parseChecklist(content)
                : editor.tryParseMarkdownToBlocks(content);

        editor.replaceBlocks(editor.document, blocks);
    }, dependency);

    return editor;
}

export default useEditor