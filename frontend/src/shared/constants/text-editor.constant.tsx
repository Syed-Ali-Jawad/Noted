import { NoteType } from "@/types/enums";
import { SquareCheck, TextInitial as RichTextIcon, Type, AlignLeft, Heading1, Heading2, Heading3, List, ListOrdered, Quote } from "lucide-react";
import { NOTES_COLOR_CLASS_MAP } from "./constants";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import type { MenuOption } from "@/types/text-editor.type";
import type { Note } from "@/types/notes.type";

export const NOTE_TYPE_OPTIONS: {
  icon: any;
  label: string;
  value: NoteType;
}[] = [
    { icon: Type, label: "Text", value: NoteType.TEXT },
    { icon: SquareCheck, label: "CheckList", value: NoteType.LIST },
    { icon: RichTextIcon, label: "RichText", value: NoteType.RICHTEXT },
  ];

export const COLOR_SELECT_OPTIONS = Object.entries(NOTES_COLOR_CLASS_MAP).map(
  (item) => ({
    value: item[0],
    color: item[1],
  }),
);

export const RICHTEXT_SCHEMA = BlockNoteSchema.create({
  blockSpecs: {
    paragraph: defaultBlockSpecs.paragraph,
    heading: defaultBlockSpecs.heading,
    bulletListItem: defaultBlockSpecs.bulletListItem,
    numberedListItem: defaultBlockSpecs.numberedListItem,
    quote: defaultBlockSpecs.quote,
  },
});

export const TEXT_SCHEMA = BlockNoteSchema.create({
  blockSpecs: {
    paragraph: defaultBlockSpecs.paragraph,
  },
});

export const CHECKLIST_SCHEMA = BlockNoteSchema.create({
  blockSpecs: {
    checkListItem: defaultBlockSpecs.checkListItem,
  },
});
export const TEXT_INITIAL_CONTENT = [
  {
    type: "paragraph",
    content: "",
  },
];

export const RICHTEXT_INITIAL_CONTENT = [
  {
    type: "paragraph",
    content: "",
  },
];

export const CHECKLIST_INITIAL_CONTENT = [
  {
    type: "checkListItem",
    content: "",
    props: {
      checked: false,
    },
  },
];


export const CUSTOM_BLOCK_TYPE_OPTIONS: MenuOption[] = [
  {
    value: "paragraph",
    label: "Paragraph",
    icon: AlignLeft,
  },
  {
    value: "heading-1",
    label: "Heading 1",
    icon: Heading1,
  },
  {
    value: "heading-2",
    label: "Heading 2",
    icon: Heading2,
  },
  {
    value: "heading-3",
    label: "Heading 3",
    icon: Heading3,
  },
  {
    value: "bullet-list",
    label: "Bullet List",
    icon: List,
  },
  {
    value: "numbered-list",
    label: "Numbered List",
    icon: ListOrdered,
  },
  {
    value: "quote",
    label: "Quote",
    icon: Quote,
  },
];

export const DEFAULT_VALUES_EDITOR: Note = {
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