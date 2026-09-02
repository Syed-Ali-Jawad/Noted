import { useRouteError } from "react-router-dom";
import GradientPage from "./GradientPage";

const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <GradientPage>
      <div className="flex min-h-75 items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="mb-3 text-2xl font-semibold text-gray-900">
            Something went wrong
          </h1>

          <p className="text-gray-600">
            {error?.message || "An unexpected error occurred."}
          </p>
        </div>
      </div>
    </GradientPage>
  );
};

export default ErrorPage;
