import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
// import Login from "./pages/Login";
import ErrorPage from "./components/ErrorPage";
// import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import ArchiveNotes from "./pages/ArchiveNotes";
import TrashNotes from "./pages/TrashNotes";
import { PAGE_ROUTES } from "./shared/constants";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { path: PAGE_ROUTES.login, element: <Login /> },
      // { path: PAGE_ROUTES.register, element: <Signup /> },
      { path: PAGE_ROUTES.notes, element: <Notes /> },
      { path: PAGE_ROUTES.archive, element: <ArchiveNotes /> },
      { path: PAGE_ROUTES.trash, element: <TrashNotes /> },
    ],
  },
]);

export default router;
