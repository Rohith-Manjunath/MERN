import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState("Register");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  async function handleClick(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
    } else {
      setBtn("Please wait...");
      try {
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
            toast.error(`Registration failed! ${result.Error}`);
            setBtn("Register");
          } else {
            localStorage.setItem("user", JSON.stringify({ name, email }));
            localStorage.setItem("token", result.token);
            toast.success("Registration successful!");

            // Wait for 2 seconds before redirecting
            setTimeout(() => {
              window.location.href = "/products";
            }, 5000);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred during registration.");
        setBtn("Register");
      }
    }
  }

  const TogglePassword = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <form className="signup-container" onSubmit={handleClick}>
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
      <div className="password-container">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Enter password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {isPasswordVisible ? (
          <PiEyeBold className="eye-icon" onClick={TogglePassword} />
        ) : (
          <PiEyeClosedBold className="eye-icon" onClick={TogglePassword} />
        )}
      </div>
      <button type="submit">{btn}</button>
      <p>
        Already a user?? <Link to="/login">Login Here</Link>{" "}
      </p>

      <ToastContainer />
    </form>
  );
};

export default Signup;
