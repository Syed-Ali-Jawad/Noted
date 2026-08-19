import type { Color, NoteType } from "../generated/prisma/client.js"

export type NoteUpdate = {
    title?: string,
    content?: string,
    color?: Color,
    type?: NoteType,
    isPinned?: boolean,
    isArchived?: boolean,
    isTrashed?: boolean,
}