import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isUserLoggedIn, user } = useSelector((state) => state.auth);

    if (!isUserLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;



