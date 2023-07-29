import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  let auth = localStorage.getItem("user");
  function clearLocalStorage() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="Navbar">
      <ul>
        {auth ? (
          <>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/addProducts">Add Products</NavLink>
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
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
