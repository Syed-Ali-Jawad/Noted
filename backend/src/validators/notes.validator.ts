import { z } from "zod";
import { NoteType } from "../generated/prisma/enums.js";

export const createNoteSchema = z.object({
  type: z.enum(NoteType, { message: "Invalid note type" }),
});

export const deleteNotesSchema = z.object({
  ids: z.array(z.string().uuid({ message: "Invalid note id" })),
});

export const updateNotesSchema = z.object({
  ids: z.array(z.string().uuid({ message: "Invalid note id" })),
  isArchived: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  isTrashed: z.boolean().optional(),
});

export const byId = z.object({
  id: z.string().uuid({ message: "Invalid note id" }),
});

export const updateSingleNote = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  color: z.string().optional(),
  type: z.enum(NoteType).optional(),
  isPinned: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isTrashed: z.boolean().optional(),
});
