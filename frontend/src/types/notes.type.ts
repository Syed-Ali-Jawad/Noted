import type { Block } from "@blocknote/core";
import type { NoteType } from "./enums";

type Note = {
  id: string;
  type: NoteType;
  title: string;
  content: string;
  image: string | null;
  color: NoteColor;
  createdAt: string;
  archivedAt: string | null;
  isArchived: boolean;
  isPinned: boolean;
  isTrashed: boolean;
};

type CheckListBlock = Block & {
  type: "checkListItem";
  content: string | { text: string }[];
  props: { checked: boolean };
};

type NoteColor = "BLUE" | "GREEN" | "YELLOW" | "WHITE" | "PURPLE";

export type { Note, CheckListBlock, NoteColor };
