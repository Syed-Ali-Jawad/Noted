import { z } from "zod";
import { NoteType } from "../generated/prisma/enums.js";

const createNoteSchema = z.object({
  type: z.enum(NoteType, { message: "Invalid note type" }),
});

const deleteNotesSchema = z.object({
  ids: z.array(z.string().uuid({ message: "Invalid note id" })),
});

const updateNotesSchema = z.object({
  ids: z.array(z.string().uuid({ message: "Invalid note id" })),
  isArchived: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  isTrashed: z.boolean().optional(),
});

const byId = z.object({
  id: z.string().uuid({ message: "Invalid note id" }),
});

const updateSingleNote = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  color: z.string().optional(),
  type: z.enum(NoteType).optional(),
  isPinned: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isTrashed: z.boolean().optional(),
});

const paramsIdSchema = z.object({ id: z.uuid("Invalid note id") });
const paramsQuerySchema = z.object({
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(20).default(10),
});

export {
  createNoteSchema,
  deleteNotesSchema,
  updateNotesSchema,
  updateSingleNote,
  byId,
  paramsIdSchema,
  paramsQuerySchema,
};
