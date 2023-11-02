import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRotate } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const [bool, setBool] = useState(true);

  let auth = localStorage.getItem("user");
  const params = useParams();

  function clearLocalStorage() {
    if (window.confirm("Are You sure, You wanna log out???")) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      window.location.href = "/products";
    }
  }

  let name = JSON.parse(localStorage.getItem("user"));

  function toggle() {
    setBool(!bool);
  }

  const HideHamburgerMenu = () => {
    setBool(true);
  };

  return (
    <div className="Navbar">
      <ul
        style={{
          transform: bool ? "translateX(0)" : "translateX(28rem)",
          transition: "all 0.5s ",
        }}
      >
        {auth ? (
          <>
            <li>
              <NavLink to="/products" onClick={HideHamburgerMenu}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/addProducts" onClick={HideHamburgerMenu}>
                Add Products
              </NavLink>
            </li>
            <li></li>
            <li>
              <NavLink to="/likedProducts" onClick={HideHamburgerMenu}>
                Liked Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={HideHamburgerMenu}>
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="register" onClick={clearLocalStorage}>
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="login">Login</NavLink>
            </li>
            <li>
              <NavLink to="register">Register</NavLink>
            </li>
            <li>
              <NavLink to="forgot">Forgot Password</NavLink>
            </li>
          </>
        )}
      </ul>

      <div className="nav-right">
        {name ? (
          <>
            <li
              style={{
                color: "white",
                listStyle: "none",
              }}
              onClick={toggle}
            >
              <FontAwesomeIcon icon={faBars} className="hamburger-icon" />
            </li>
            <li>
              <h2>Hey 👋 {name.name}</h2>
            </li>
          </>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default Navbar;
