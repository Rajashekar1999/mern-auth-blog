import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (
    !userInfo ||
    (allowedRoles && !allowedRoles.includes(userInfo.user.role))
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
