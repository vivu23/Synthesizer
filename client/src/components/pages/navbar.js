<<<<<<< HEAD
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import "../css/Main.css";

export default function NavBar() {
  const isLoggedIn = useContext(GlobalContext).isLoggedIn;
  const {logout} = useContext(GlobalContext).logout;
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const handleLogOut = () => {
    setClick(!click);
    logout(false);
  }
  return (
    <>
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          KV-SYN
          {/*
          <i className="nav-logo">
              <img src={Logo} alt=""/>
          </i>
          */}
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn ? (
          <>
          <li className="nav-item">
            <NavLink
              exact
              to="/social"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Social
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/profile"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links"
              onClick={handleLogOut}
            >
              Log Out
            </NavLink>
          </li>
          </> 
          ):(
          <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                Login
                </NavLink>
              </li>
          )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
    </div>
  </nav>
  </>
  );
}
||||||| merged common ancestors
=======
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from '../resources/favicon-32x32.png';
import "../css/Main.css";

export default function NavBar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          Synthesizer
          <i className="nav-logo">
              <img src={Logo} alt=""/>
          </i>
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/about"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                Login
                </NavLink>
              </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
    </div>
  </nav>
  </>
  );
}
>>>>>>> f10a77a7ffbb2f20a68610ffbae40d1af5977176
