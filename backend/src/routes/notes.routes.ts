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
  paramsIdSchema,
  paramsQuerySchema,
  updateNotesSchema,
  updateSingleNote,
} from "../validators/notes.validator.js";
import { validate } from "../middlewares/validate.js";

const noteRouter = Router();

noteRouter.use(authenticate);

noteRouter.post("/", validate(createNoteSchema), createNote);

noteRouter.get(
  "/archived",
  validate(paramsQuerySchema, "query"),
  getArchivedNotes,
);

noteRouter.get(
  "/trashed",
  validate(paramsQuerySchema, "query"),
  getTrashedNotes,
);

noteRouter.get("/pinned", validate(paramsQuerySchema, "query"), getPinnedNotes);

noteRouter.get("/", validate(paramsQuerySchema, "query"), getNotes);

noteRouter.delete("/", validate(deleteNotesSchema), deleteNotes);

noteRouter.delete("/trash", emptyTrash);

noteRouter.patch("/", validate(updateNotesSchema), updateNotes);

noteRouter.patch("/:id", validate(updateSingleNote), updateNoteById);

noteRouter.get("/:id", validate(paramsIdSchema, "params"), getNoteById);

noteRouter.delete("/:id", validate(paramsIdSchema, "params"), deleteNoteById);

export default noteRouter;
