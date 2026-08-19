import { NoteType } from "@/types/enums";
import { getInitialContent, getSchema, parseChecklist } from "@/components/TextEditor/utils";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

const useEditor = ({ type, content, placeholder }: { type: NoteType, content: string, placeholder?: string }) => {
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

    useEffect(() => {
        const blocks =
            type === NoteType.LIST
                ? parseChecklist(content)
                : editor.tryParseMarkdownToBlocks(content);

        editor.replaceBlocks(editor.document, blocks);
    }, [editor]);

    return editor;
}

export default useEditor