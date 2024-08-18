import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import goldLogo from "../../Assets/goldLogo.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img src={goldLogo} alt="LOGO" />
      <ul>
        <li>
          <a href="/liveRates">Live Rates</a>
        </li>
        <li onClick={() => navigate("/guide")}>Trading Guide</li>
        <li onClick={() => navigate("/calculator")}>Calculator</li>
        {/* <li onClick={() => navigate("/login")}>Login</li> */}
      </ul>
    </div>
  );
};

export default Header;
