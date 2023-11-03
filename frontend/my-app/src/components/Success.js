import React from "react";
import "../App.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="success-container">
      <div className="success-message">
        <h1>Payment Successful</h1>
        <p>
          Thank you for your purchase! Your payment was successful. Your order
          will be processed shortly.
        </p>
        <Link to="/" className="back-to-home-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
