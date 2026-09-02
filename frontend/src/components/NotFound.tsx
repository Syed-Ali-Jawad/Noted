import { Link } from "react-router-dom";
import GradientPage from "./GradientPage";

const NotFound = () => {
  return (
    <GradientPage>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-7xl font-bold text-primary">404</h1>

          <h2 className="mt-4 text-2xl font-semibold text-gray-600">
            Page Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            Sorry, the page you're looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Go Home
          </Link>
        </div>
      </div>
    </GradientPage>
  );
};

export default NotFound;
