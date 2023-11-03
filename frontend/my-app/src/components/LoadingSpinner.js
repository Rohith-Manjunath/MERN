import React from "react";
import PropTypes from "prop-types";
import "../Loading.css"; // Import your CSS file for styles or add styles directly in the component

const LoadingSpinner = ({ isLoading }) => {
  return (
    <div className={`loading-spinner ${isLoading ? "visible" : "hidden"}`}>
      <div className="spinner"></div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingSpinner;
