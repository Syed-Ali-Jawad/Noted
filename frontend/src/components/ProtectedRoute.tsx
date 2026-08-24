import { Outlet, Navigate } from "react-router-dom"
import PageLayout from "./PageLayout"

const ProtectedRoute = () => {
    const token = localStorage.getItem("token")

    if (token) {
        return <PageLayout><Outlet /></PageLayout>
    } else {
        return <Navigate to={"/login"} replace />
    }
}

export default ProtectedRoute;