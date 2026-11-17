import "../types/express.d.ts";
import type { Request, Response } from "express";
import {
  addANote,
  dbDeleteNoteById,
  dbDeleteNotes,
  dbEmptyTrash,
  dbGetNote,
  dbGetNoteByArchived,
  dbGetNoteById,
  dbGetPinnedNotes,
  dbGetTrashedNotes,
  dbUpdateNoteById,
  dbUpdateNotes,
} from "../services/notes.service.js";
import type { NoteUpdate } from "../types/note.type.js";
import type { NoteType } from "../generated/prisma/enums.js";

export const createNote = async (req: Request, res: Response) => {
  const { type } = req.body;
  const note = await addANote(req.userId as string, type as NoteType);

  return res.status(201).json({ success: true, note: note });
};

export const updateNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { title, content, color, type, isPinned, isArchived, isTrashed } =
    req.body;
  const updateObject = {
    title,
    content,
    color,
    type,
    isPinned,
    isArchived,
    isTrashed,
  };

  const updatedNote = await dbUpdateNoteById(
    id as string,
    req.userId as string,
    updateObject as NoteUpdate,
  );

  return res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note: updatedNote,
  });
};

export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const note = await dbGetNoteById(id as string, req.userId as string);

  return res.status(200).json({ note });
};

export const deleteNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userId = req.userId as string;

  await dbDeleteNoteById(id as string, userId);

  return res
    .status(200)
    .json({ success: true, message: "Note deleted successfully" });
};

export const deleteNotes = async (req: Request, res: Response) => {
  const { ids } = req.body;

  await dbDeleteNotes(ids, req.userId as string);

  return res
    .status(200)
    .json({ success: true, message: "Notes deleted permenantly" });
};

export const updateNotes = async (req: Request, res: Response) => {
  const { ids, isArchived, isPinned, isTrashed } = req.body;
  const notes = await dbUpdateNotes(
    ids,
    req.userId as string,
    isArchived,
    isPinned,
    isTrashed,
  );

  return res
    .status(200)
    .json({ success: true, message: "Notes updated successfully", notes });
};

export const getNotes = async (req: Request, res: Response) => {
  const { search, page, pageSize } = req.query;

  const { notes, totalNotes } = await dbGetNote(
    req.userId as string,
    parseInt(page as string) || 1,
    parseInt(pageSize as string) || 10,
    search as string | undefined,
  );

  return res.status(200).json({ success: true, notes, totalNotes });
};

export const getArchivedNotes = async (req: Request, res: Response) => {
  const userId = req.userId as string;
  const { search, page, pageSize } = req.query;
  const { notes, totalNotes } = await dbGetNoteByArchived(
    userId,
    parseInt(page as string) || 1,
    parseInt(pageSize as string) || 10,
    search as string | undefined,
  );

  return res.status(200).json({ success: true, notes, totalNotes });
};

export const getTrashedNotes = async (req: Request, res: Response) => {
  const userId = req.userId as string;
  const { search, page, pageSize } = req.query;

  const { notes, totalNotes } = await dbGetTrashedNotes(
    userId,
    parseInt(page as string) || 1,
    parseInt(pageSize as string) || 10,
    search as string | undefined,
  );

  return res.status(200).json({ success: true, notes, totalNotes });
};

export const getPinnedNotes = async (req: Request, res: Response) => {
  const userId = req.userId as string;
  const { search } = req.query;

  const notes = await dbGetPinnedNotes(userId, search as string | undefined);

  res.status(200).json({
    success: true,
    notes,
  });
};

export const emptyTrash = async (req: Request, res: Response) => {
  const userId = req.userId as string;

  await dbEmptyTrash(userId);

  res.status(200).json({
    success: true,
    message: "Trash emptied successfully",
  });
};
