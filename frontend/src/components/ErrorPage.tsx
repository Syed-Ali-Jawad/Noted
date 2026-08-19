import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as Error;
  return <div>{error.message}</div>;
};

export default ErrorPage;
