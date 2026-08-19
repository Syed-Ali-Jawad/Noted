import type { Request, Response } from "express"
import { addANote, dbDeleteNoteById, dbDeleteNotes, dbGetNote, dbGetNoteByArchived, dbGetNoteById, dbGetPinnedNotes, dbGetTrashedNotes, dbUpdateNoteById, dbUpdateNotes } from "../services/notes.service.js"
import type { NoteUpdate } from "../types/note.type.js"

export const createNote = async (req: Request, res: Response) => {

    const note = await addANote(req.userId as string)

    return res.status(201).json({ success: true, noteId: note.id })
}

export const updateNoteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { title, content, color, type, isPinned, isArchived, isTrashed } = req.body;
    const updateObject = {
        title,
        content,
        color,
        type,
        isPinned,
        isArchived,
        isTrashed
    }

    const updatedNote = await dbUpdateNoteById(id as string, req.userId as string, updateObject as NoteUpdate)

    return res.status(200).json({ success: true, message: "Note updated successfully", note: updatedNote })
}

export const getNoteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const note = await dbGetNoteById(id as string, req.userId as string)

    return res.status(200).json({ note })
}

export const deleteNoteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const userId = req.userId as string

    await dbDeleteNoteById(id as string, userId)

    return res.status(200).json({ success: true, message: "Note deleted successfully" })
}


export const deleteNotes = async (req: Request, res: Response) => {
    const { ids } = req.body;

    await dbDeleteNotes(ids, req.userId as string)

    return res.status(200).json({ success: true, message: "Notes deleted permenantly" })
}

export const updateNotes = async (req: Request, res: Response) => {
    const { ids, isArchived, isPinned, isTrashed } = req.body;
    const notes = await dbUpdateNotes(ids, req.userId as string, isArchived, isPinned, isTrashed)

    return res.status(200).json({ success: true, message: "Notes updated successfully", notes })
}

export const getNotes = async (req: Request, res: Response) => {
    const notes = await dbGetNote(req.userId as string)

    return res.status(200).json({ success: true, notes })
}

export const getArchivedNotes = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const notes = await dbGetNoteByArchived(userId)

    return res.status(200).json({ success: true, notes })

}

export const getTrashedNotes = async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const notes = await dbGetTrashedNotes(userId)

    return res.status(200).json({ success: true, notes })
}

export const getPinnedNotes = async (req: Request, res: Response) => {
    const userId = req.userId as string

    const notes = await dbGetPinnedNotes(userId)

    res.status(200).json({
        success: true,
        notes
    })
}