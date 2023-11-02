import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [btn, setBtn] = useState("Login");

  async function handleClick(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
    } else {
      setBtn("Please wait...");

      try {
        let result = await fetch(
          "https://e-commerce-website-is92.onrender.com/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        result = await result.json();

        if (result && result.Error) {
          toast.error(`Login failed! ${result.Error}`);
          setBtn("Login");
        } else {
          localStorage.setItem("user", JSON.stringify({ name, email }));
          localStorage.setItem("token", result.token);
          toast.success("Login successful!");
          setTimeout(() => {
            window.location.href = "/products";
          }, 5000);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred during login.");
        setBtn("Login");
      }
    }
  }

  return (
    <form className="signup-container" onSubmit={handleClick}>
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
      <button type="submit">{btn}</button>
      <p>
        Not a user yet?? <Link to="/register">Register Here</Link>
      </p>
      <p>
        Forgot Password? <Link to="/forgot">ForgotPassword</Link>
      </p>

      <ToastContainer />
    </form>
  );
};

export default Login;
