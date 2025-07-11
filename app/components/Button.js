import React from "react";

const Button = ({ label, onClick, className = "" }) => {
  return (
    <button
      className={`
        p-4 rounded-full text-2xl font-semibold text-black
        transition-all duration-200 ease-in-out
        shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-4
        bg-black-200 hover:bg-gray-200 text-gray-400
        ${className}
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
