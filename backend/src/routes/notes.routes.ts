import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import { createNote, deleteNoteById, deleteNotes, getArchivedNotes, getNoteById, getNotes, getPinnedNotes, getTrashedNotes, updateNoteById, updateNotes } from "../controllers/note.controller.js";

const noteRouter = Router();

noteRouter.use(authenticate)

noteRouter.post("/", createNote)

noteRouter.get("/archived", getArchivedNotes)

noteRouter.get("/trashed", getTrashedNotes)

noteRouter.get("/pinned", getPinnedNotes)


noteRouter.patch("/:id", updateNoteById)

noteRouter.get("/:id", getNoteById)

noteRouter.delete("/:id", deleteNoteById)

noteRouter.get("/", getNotes)

noteRouter.delete("/", deleteNotes)

noteRouter.patch("/", updateNotes)


export default noteRouter