import { AppError } from "../errors/AppError.js"
import { prisma } from "../lib/prisma.js"
import { validateNoteId } from "../lib/utils.js"
import type { NoteUpdate } from "../types/note.type.js"


export const addANote = async (userId: string) => {
    if (!userId) throw new AppError(400, "User id is required");
    const note = await prisma.note.create({
        data: {
            userId,
            trashedAt: null
        },
        select: {
            id: true
        }
    })

    return note
}


export const dbUpdateNoteById = async (id: string, userId: string, requestBody: NoteUpdate) => {

    validateNoteId(id)

    const updatedNote = await prisma.note.update({
        where: {
            id,
            userId
        },
        data: {
            ...requestBody
        },
        select: {
            id: true,
            content: true,
            title: true,
            isArchived: true,
            isPinned: true,
            isTrashed: true,
            color: true,
        }
    })

    return updatedNote
}

export const dbGetNoteById = async (id: string, userId: string) => {
    validateNoteId(id)
    const note = await prisma.note.findUnique({
        where: {
            id,
            userId
        }
    })

    if (!note) throw new AppError(404, "Note not found");

    return note
}

export const dbDeleteNoteById = async (id: string, userId: string) => {
    validateNoteId(id)

    await prisma.note.deleteMany({
        where: {
            id,
            userId
        }
    })

    return
}


export const dbDeleteNotes = async (ids: string[], userId: string) => {
    if (!ids || ids.length === 0) throw new AppError(400, "Note ids to delete are required");

    await prisma.note.deleteMany({
        where: {
            userId,
            id: {
                in: ids
            }
        }
    });

    return;

}

export const dbUpdateNotes = async (ids: string[], userId: string, isArchived: boolean, isPinned: boolean, isTrashed: boolean) => {
    const notes = await prisma.note.updateManyAndReturn({
        where: {
            id: {
                in: ids
            },
            userId
        },
        data: {
            isArchived,
            isPinned,
            isTrashed
        },
        select: {
            id: true,
            isArchived: true,
            isPinned: true,
            isTrashed: true,
            color: true,
            title: true,
            content: true
        }
    })

    return notes
}

export const dbGetNote = async (userId: string) => {
    if (!userId) throw new AppError(400, "User id is required");
    const notes = await prisma.note.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            title: true,
            content: true,
            isArchived: true,
            isPinned: true,
            isTrashed: true,
            color: true,
        }
    })

    return notes
}

export const dbGetNoteByArchived = async (userId: string) => {

    if (!userId) throw new AppError(400, "User id is required");

    const notes = await prisma.note.findMany({
        where: {
            isArchived: true,
            userId
        },
        select: {
            id: true,
            title: true,
            content: true,
            isArchived: true,
            isPinned: true,
            isTrashed: true,
            color: true,
        }
    })

    return notes
}

export const dbGetTrashedNotes = async (userId: string) => {
    if (!userId) throw new AppError(400, "User id is required");

    const notes = await prisma.note.findMany({
        where: {
            userId,
            isTrashed: true
        },
        select: {
            id: true,
            title: true,
            content: true,
            isArchived: true,
            isPinned: true,
            isTrashed: true,
            color: true,
        }
    })

    return notes
}

export const dbGetPinnedNotes = async (userId: string) => {
    if (!userId) throw new AppError(400, "User id is required");

    const notes = await prisma.note.findMany({
        where: {
            userId,
            isPinned: true
        },
        select: {
            id: true,
            title: true,
            content: true,
            isArchived: true,
            isPinned: true,
            isTrashed: true,
            color: true,
        }
    })
    return notes;
}