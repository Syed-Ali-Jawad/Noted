import type { Block } from "@blocknote/core";
import type { NoteType } from "./enums";

export type Note = {
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
  isTrashed:boolean
};

export type CheckListBlock = Block & {
  type: "checkListItem";
  content: string | { text: string }[];
  props: { checked: boolean };
};

export type NoteColor = "blue" | "green" | "yellow" | "white" | "purple";
