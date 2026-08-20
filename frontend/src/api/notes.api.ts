
import type { Note } from "@/types/notes.type";
import api from "./client";
import type { NoteType } from "@/types/enums";

export const getNotes = async (search?: string) => {
    try {
        const params = new URLSearchParams();

        if (search?.trim()) {
            params.set("search", search.trim());
        }

        const { data } = await api.get(`/notes${search ? `?search=${search}` : ""}`)
        return data.notes
    } catch (error) {
        throw error
    }
}

export const getPinnedNotes = async (search?: string) => {
    try {
        const params = new URLSearchParams();

        if (search?.trim()) {
            params.set("search", search.trim());
        }

        const { data } = await api.get(`/notes/pinned${search ? `?search=${search}` : ""}`)

        return data.notes
    }
    catch (err) {
        throw err
    }
}

export const getArchivedNotes = async (search?: string) => {
    try {
        const params = new URLSearchParams();

        if (search?.trim()) {
            params.set("search", search.trim());
        }

        const { data } = await api.get(`/notes/archived${search ? `?search=${search}` : ""}`)

        return data.notes
    }
    catch (err) {
        throw err
    }
}

export const getTrashedNotes = async (search?: string) => {
    try {
        const params = new URLSearchParams();

        if (search?.trim()) {
            params.set("search", search.trim());
        }

        const { data } = await api.get(`/notes/trashed${search ? `?search=${search}` : ""}`)

        return data.notes
    }
    catch (err) {
        throw err
    }
}

export const getNote = async (id: string) => {
    try {
        const { data } = await api.get(`/notes/${id}`)

        return data.note
    }
    catch (err) {
        throw err
    }
}

export const deleteSingleNote = async (id: string) => {
    try {
        await api.delete(`/notes/${id}`)
    }
    catch (err) {
        throw err
    }
}

export const deleteNotes = async ({ arg }: { arg: string[] }) => {
    try {
        await api.delete(`/notes`, {
            data: { ids: arg }
        })
    }
    catch (err) {
        throw err
    }
}

type UpdateNoteArgs = {
    id: string;
    updates: Partial<Note>;
};

export const updateSingleNote = async (
    _url: string,
    { arg }: { arg: UpdateNoteArgs }
) => {
    try {
        const { data } = await api.patch(`/notes/${arg.id}`, arg.updates);
        return data;
    }
    catch (error) {
        throw error
    }
}

export const updateNotes = async (_url: string, { arg }: { arg: { ids: string[], updates: Partial<Note> } }) => {
    try {
        const { data } = await api.patch("/notes", { ids: arg.ids, ...arg.updates });
        return data;
    }
    catch (error) {
        throw error
    }
}

export const createNote = async (type: NoteType) => {
    try {
        const { data } = await api.post("/notes", { type })
        return data.note
    }
    catch (error) {
        throw error
    }
}

export const emptyTrash = async () => {
    try {
        await api.delete("/notes/trash")
    }
    catch (error) {
        throw error
    }
}
