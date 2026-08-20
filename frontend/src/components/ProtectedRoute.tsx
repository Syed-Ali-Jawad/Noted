import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoute = () => {
    const token = localStorage.getItem("token")

    if (token) {
        return <Outlet />
    } else {
        return <Navigate to={"/login"} replace />
    }
}

export default ProtectedRoute;