import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isSalesman = false;
  let isAdmin = false;
  let isAdministrator = false;
  let status = "Salesman";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles, shopNo, godownNo, posId, address, phoneNo } =
      decoded.UserInfo;

    console.log(roles);

    isSalesman = roles.includes("Salesman");
    isAdmin = roles.includes("Admin");
    isAdministrator = roles.includes("Administrator");

    console.log(decoded.UserInfo);

    if (isSalesman) status = "Salesman";
    if (isAdmin) status = "Admin";
    if (isAdministrator) status = "Administrator";

    // console.log(shopNo);
    // console.log(posId);
    // console.log(address);

    // console.log(phoneNo);

    localStorage.setItem("isAdministrator", JSON.stringify(isAdministrator));
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    localStorage.setItem("isSalesman", JSON.stringify(isSalesman));
    localStorage.setItem("roles", JSON.stringify(roles));
    localStorage.setItem("username", JSON.stringify(username));
    localStorage.setItem("status", JSON.stringify(status));
    localStorage.setItem("shopId", JSON.stringify(shopNo));
    localStorage.setItem("godownId", JSON.stringify(godownNo));
    localStorage.setItem("posId", JSON.stringify(posId));
    localStorage.setItem("address", JSON.stringify(address));
    localStorage.setItem("phoneNo", JSON.stringify(phoneNo));

    return {
      username,
      roles,
      status,
      isSalesman,
      isAdmin,
      shopNo,
      godownNo,
      posId,
      address,
      shopNo,
    };
  }
  return { username: "", roles: [], isSalesman, isAdmin, status };
};
export default useAuth;
