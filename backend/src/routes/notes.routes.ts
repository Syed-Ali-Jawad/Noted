import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import {
  createNote,
  deleteNoteById,
  deleteNotes,
  emptyTrash,
  getArchivedNotes,
  getNoteById,
  getNotes,
  getPinnedNotes,
  getTrashedNotes,
  updateNoteById,
  updateNotes,
} from "../controllers/note.controller.js";
import {
  createNoteSchema,
  deleteNotesSchema,
  updateNotesSchema,
  updateSingleNote,
} from "../validators/notes.validator.js";
import { validate } from "../middlewares/validate.js";

const noteRouter = Router();

noteRouter.use(authenticate);

noteRouter.post("/", validate(createNoteSchema), createNote);

noteRouter.get("/archived", getArchivedNotes);

noteRouter.get("/trashed", getTrashedNotes);

noteRouter.get("/pinned", getPinnedNotes);

noteRouter.get("/", getNotes);

noteRouter.delete("/", validate(deleteNotesSchema), deleteNotes);

noteRouter.delete("/trash", emptyTrash);

noteRouter.patch("/", validate(updateNotesSchema), updateNotes);

noteRouter.patch("/:id", validate(updateSingleNote), updateNoteById);

noteRouter.get("/:id", getNoteById);

noteRouter.delete("/:id", deleteNoteById);

export default noteRouter;
