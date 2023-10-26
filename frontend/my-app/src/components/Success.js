import React from "react";
import "../App.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="success-message">
      Payment Success
      <Link to="/">Back to home</Link>
    </div> // Apply the CSS class to the component
  );
};

export default Success;
