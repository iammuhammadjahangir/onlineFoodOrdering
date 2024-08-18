import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const rolesString = localStorage.getItem("roles");
  const roles = JSON.parse(rolesString);

  const content = roles?.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <>{localStorage.clear()}</>
  );

  return content;
};
export default RequireAuth;
