import {
  CHECKLIST_INITIAL_CONTENT,
  CHECKLIST_SCHEMA,
  RICHTEXT_INITIAL_CONTENT,
  RICHTEXT_SCHEMA,
  TEXT_INITIAL_CONTENT,
  TEXT_SCHEMA,
} from "@/shared/text-editor.constant";
import { NoteType } from "@/types/enums";
import type { CheckListBlock } from "@/types/notes.type";
import type { Block } from "@blocknote/core";

export const getSchema = (type: NoteType) =>
  type === NoteType.LIST
    ? CHECKLIST_SCHEMA
    : type === NoteType.RICH_TEXT
      ? RICHTEXT_SCHEMA
      : TEXT_SCHEMA;

export const getInitialContent = (type: NoteType) =>
  type === NoteType.LIST
    ? CHECKLIST_INITIAL_CONTENT
    : type === NoteType.RICH_TEXT
      ? RICHTEXT_INITIAL_CONTENT
      : TEXT_INITIAL_CONTENT;

export const parseChecklist = (content: string) =>
  content
    .split("\n")
    .filter(Boolean)
    .map((line) => ({
      type: "checkListItem" as const,
      content: line.replace(/- \[[ x]\]\s*/gi, ""),
      props: {
        checked: /^- \[x\]/i.test(line),
      },
    }));

export const checkListToMarkdown = (document: Block[]) =>
  document
    .map((block) => {
      if (block.type !== "checkListItem") return "";

      const b = block as CheckListBlock;

      const text =
        typeof b.content === "string"
          ? b.content
          : b.content.map((item) => ("text" in item ? item.text : "")).join("");

      const cleanText = stripMarkdown(text);

      return `- [${b.props.checked ? "x" : " "}] ${cleanText}`;
    })
    .join("\n");

const stripMarkdown = (text: string) =>
  text
    // headings: ## Heading
    .replace(/^#{1,6}\s+/gm, "")
    // bullets / numbered lists
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    // blockquotes
    .replace(/^\s*>\s?/gm, "")
    // bold / italic / strikethrough
    .replace(/(\*\*|__|\*|_|~~)/g, "")
    // inline code
    .replace(/`([^`]+)`/g, "$1")
    // links: [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
