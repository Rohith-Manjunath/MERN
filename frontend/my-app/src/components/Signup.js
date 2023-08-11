import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   navigate to products page after successful registration and store user details in local storage for authentication purposes
  async function handleClick(e) {
    e.preventDefault();

    if (!name && !email && !password) {
      alert("All fields are required");
    } else {
      let result = await fetch(
        "https://e-commerce-website-is92.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

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
  }

  return (
    <div className="signup-container">
      <h1>Register</h1>
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
        Register
      </button>
      <p>
        Already a user?? <Link to="/login">Login Here</Link>{" "}
      </p>
    </div>
  );
};

export default Signup;
