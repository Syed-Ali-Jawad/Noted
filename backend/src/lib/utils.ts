import { AppError } from "../errors/AppError.js";

export const validateNoteId = (id: string) => {
    if (!id) throw new AppError(400, "Note id is required");
};
