import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  let Name = JSON.parse(localStorage.getItem("user"));

  //   navigate to products page after successful registration and store user details in local storage for authentication purposes
  async function handleClick(e) {
    e.preventDefault();

    if (!email && !password) {
      alert("All fields are required");
    } else {
      let result = await fetch("http://localhost:2000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      result = await result.json();

      if (result) {
        if (result.Error) {
          alert(`Login failed! ${result.Error}`);
        } else {
          localStorage.setItem("user", JSON.stringify({ name, email }));
          localStorage.setItem("token", result.token);
          window.location.href = "/products";
        }
      }
    }
  }

  return (
    <div className="signup-container">
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Enter Name"
        required
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>
        Login
      </button>
      <p>
        Not a user yet?? <Link to="/register">Register Here</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
