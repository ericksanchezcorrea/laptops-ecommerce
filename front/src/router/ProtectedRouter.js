import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = ({
  isAllowed,
  redirectTo = "/",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />
};
export default ProtectedRouter