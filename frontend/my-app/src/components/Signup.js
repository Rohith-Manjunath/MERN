import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault();

    let result = await fetch("http://localhost:2000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    result = await result.json();

    if (result) {
      if (result.Error) {
        alert(`Registration failed! ${result.message}`);
      } else {
        localStorage.setItem("user", JSON.stringify({ name, email }));
        localStorage.setItem("token", result.token);
        window.location.href = "/products";
      }
    }
  }

  return (
    <div className="signup-container">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>
        Register
      </button>
    </div>
  );
};

export default Signup;
