import { NoteType } from "@/types/enums";
import { SquareCheck, TextInitial as RichTextIcon, Type } from "lucide-react";
import { NOTES_COLOR_CLASS_MAP } from "./constants";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

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
    checkListItem: defaultBlockSpecs.checkListItem,
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
