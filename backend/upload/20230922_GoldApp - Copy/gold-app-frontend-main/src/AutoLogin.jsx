import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Auth } from "./Auth";
const AutoLogin = () => {
  const [data, setData] = useState("data");

  const navigate = useNavigate();

  useEffect(() => {
    getRole();
  }, []);
  const getRole = async () => {
    const result = await Auth();
    setData("");

    if (result.role === "admin" || result.role === "user") {
      navigate("/admin/updateRates");
    }
  };

  return data === "" && <Outlet />;
};

export default AutoLogin;
