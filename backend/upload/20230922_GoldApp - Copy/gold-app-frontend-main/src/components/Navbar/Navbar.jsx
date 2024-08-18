import React from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { storeAuthFormData } from "../../features/authSlice";
import { Auth } from "../../Auth";
import { useState } from "react";
import {getOnlyAllowedTasks} from "../../api/index"

import MiniDrawer from "./SideBar";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [permissions, setPermissions] = useState("");
  const location = useLocation();
  useEffect(() => {
    let obj = localStorage.getItem("userData");

    dispatch(storeAuthFormData(JSON.parse(obj)));
    console.log("hello")
    getRole();
  }, [location.pathname]);

  const getRole = async () => {
    // const result = await Auth();
    // console.log(result.permission);
    // setData(result.role);
    // setPermissions(result.permission);

    const result = await Auth();
    const permission = await getOnlyAllowedTasks( JSON.parse(localStorage.getItem("userRoleId")));
    console.log(result.role);
    console.log(permission.data.taskNamesArray);
    setData(result.role);
    setPermissions(permission.data.taskNamesArray);
  };

  const userData = useSelector((state) => {
    return state.authFormData.authFormData.name;
  });
  const user = userData !== undefined ? userData : null;

  return (
    <>
      <MiniDrawer
        props={{
          user: userData,
          data: data,
          user: user,
          permissions: permissions,
        }}
      />
    </>
  );
};

export default Navbar;
