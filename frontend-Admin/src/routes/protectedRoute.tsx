import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { resetToken } from "../redux/reducers/userReducer";

type ProtectedRoutesType = {
  children?: ReactElement;
  allowedRoles: string[];
  isAuthenticated: boolean;
  role: string;
  loading: boolean;
  error: string | null;
  redirect?: string;
};

const ProtectedRoute = ({
  children,
  allowedRoles,
  isAuthenticated = false,
  role,
  loading,
  redirect = "/login",
}: ProtectedRoutesType) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetToken() as any);
  }, [location]);

  // To check if the used is authenticated or not
  if (!loading && !isAuthenticated && !allowedRoles.includes(role)) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
