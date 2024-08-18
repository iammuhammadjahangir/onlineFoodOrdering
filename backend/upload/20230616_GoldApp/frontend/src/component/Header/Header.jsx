import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

//For Images Import
import goldLogo from "../../assets/goldLogo.png";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

//For Css Import
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(false);
    setNavVisibility(false);
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const handleloginLogout = () => {
    if (localStorage.getItem("userData") === "true") {
      localStorage.clear();
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  return (
    <header className="Header">
      <img src={goldLogo} className="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a href="/">Live Rates</a>
          <a href="/goldHistory">Insights</a>
          <a href="/calculateMetals">Gold Calculator</a>
          <a href="/calculatesilver">Silver Calculator</a>
          <a href="/trading">Trading Guide</a>
          <button onClick={handleloginLogout}>
            {localStorage.getItem("userData") === "true" ? "Logout" : "Login"}
          </button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <DensityMediumIcon style={{ color: "white" }} />
      </button>
    </header>
    // <div className="Header">
    //   <div className="logo">
    //     <img src={goldLogo} alt="logo" />
    //   </div>
    //   <div className="headerList">
    //     <ul>
    //       <li>
    //         <a href="/">Live Rates</a>
    //       </li>
    //       <li>
    //         <a href="/goldHistory">Insights</a>
    //       </li>
    //       <li>
    //         <a href="/calculateMetals">Gold Calculator</a>
    //       </li>
    //       <li>
    //         <a href="/calculatesilver">Silver Calculator</a>
    //       </li>
    //       <li>
    //         <a href="/trading">Trading Guide</a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default Header;
