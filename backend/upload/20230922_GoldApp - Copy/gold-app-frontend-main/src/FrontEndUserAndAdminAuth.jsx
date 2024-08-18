import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Auth } from "./Auth";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const FrontEndUserAndAdminAuth = () => {
  const [data, setData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getRole();
  }, []);
  const getRole = async () => {
    const result = await Auth();
    console.log(result);
    setData(result.role);

    if (
      result.role !== "admin" &&
      result.role !== "user" &&
      result.role !== "Administrator"
    ) {
      navigate("/login");
    }
  };

  return (
    (data === "admin" || data === "user" || data === "Administrator") && (
      <>
        <Navbar />
        <Outlet />
      </>
    )
  );
};

export default FrontEndUserAndAdminAuth;
