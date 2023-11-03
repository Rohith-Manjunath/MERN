import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const updatepassword = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://e-commerce-website-is92.onrender.com/forgotPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        let user = await response.json();
        if (user) {
          toast.success(user.message);
          setTimeout(() => {
            window.location.href = "/login";
          }, 4000);
        } else {
          toast.error("Invalid response from server");
        }
      } else {
        toast.error(
          "Error updating password / User doesn't exists. Please try again later."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const TogglePassword = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <form className="signup-container" onSubmit={updatepassword}>
      <input
        type="text"
        placeholder="Enter Your email"
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
      <button style={{ width: "60%" }}>Update Password</button>
      <ToastContainer />
    </form>
  );
};

export default ForgotPassword;
