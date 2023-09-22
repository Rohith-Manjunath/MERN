import React from "react";
import { useState } from "react";

const ForgotPassword = (e) => {
  e.preventDefault();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updatepassword = async () => {
    let user = await fetch(
      "https://e-commerce-website-is92.onrender.com/forgotPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    user = await user.json();

    if (user) {
      alert(user.message);
      window.location.href = "/login";
    } else {
      alert("Please enter a valid Email address");
    }
  };

  return (
    <div className="signup-container">
      <input
        type="text"
        placeholder="Enter Your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter New Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={updatepassword} style={{ width: "60%" }}>
        Update Password
      </button>
    </div>
  );
};

export default ForgotPassword;
