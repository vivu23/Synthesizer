import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import UserProfile from "../scripts/UserProfile";
import "../css/Main.css";

export default function NavBar() {
  const [click, setClick] = useState(false);
  const session = UserProfile.getSession();
  const handleClick = () => setClick(!click);
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
          {session ? (
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
