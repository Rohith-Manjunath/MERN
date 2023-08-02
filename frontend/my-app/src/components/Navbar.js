import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  let auth = localStorage.getItem("user");

  function clearLocalStorage() {
    if (window.confirm("Are You sure , You wanna log out???")) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }

  let name = JSON.parse(localStorage.getItem("user"));

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
              <NavLink to="/updateProduct">Update Products</NavLink>
            </li>
            <li>
              <NavLink to="/likedProducts">Liked Products</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
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

      <div className="nav-right">
        {name ? (
          <li>
            <h2>Hey 👋 {name.name}</h2>
          </li>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default Navbar;
