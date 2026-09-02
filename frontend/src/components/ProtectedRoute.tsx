import { Outlet, Navigate } from "react-router-dom";
import PageLayout from "./PageLayout";
import ScrollToTop from "./ScrollToTop";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return (
      <PageLayout>
        <ScrollToTop />
        <Outlet />
      </PageLayout>
    );
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default ProtectedRoute;
