import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "./components/ErrorPage";
import Notes from "./pages/Notes";
import ArchiveNotes from "./pages/ArchiveNotes";
import TrashNotes from "./pages/TrashNotes";
import { PAGE_ROUTES } from "./shared/constants/constants";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([

  { path: PAGE_ROUTES.login, element: <Login /> },
  { path: PAGE_ROUTES.register, element: <Signup /> },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: PAGE_ROUTES.notes, element: <Notes /> },
      { path: PAGE_ROUTES.archive, element: <ArchiveNotes /> },
      { path: PAGE_ROUTES.trash, element: <TrashNotes /> },
    ],
  },
]);

export default router;
