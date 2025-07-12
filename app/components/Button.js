import React from "react";

const Button = ({ label, onClick, className = "" }) => {
  return (
    <button
      className={`
        p-4 rounded-4xl text-2xl font-semibold
        transition-all duration-150 ease-out // Faster transition for click feedback
        shadow-md hover:shadow-lg // Subtle shadow on hover
        active:scale-95 active:shadow-sm // Press down effect on click
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
