import React from "react";

const Showcase = ({ presenterName, projectTitle, onLaunchCalculator }) => {
  return (
    <div
      className="
      bg-white shadow-2xl rounded-xl p-8 w-full max-w-md h-[500px] // Fixed height to match calculator roughly
      border-2 border-[#ed485e] // Theme border
      flex flex-col items-center justify-center text-center // Center content
      transform transition-all duration-300 hover:scale-102 hover:shadow-xl // Floating effect
    "
    >
      <div className="flex justify-center mb-6">
        <img
          src="https://woxsen.edu.in/uploads/L20241112111757.webp"
          alt="Woxsen University Logo"
          className="h-20 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/100x40/cccccc/333333?text=Logo+Error";
          }}
        />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{projectTitle}</h1>

      <p className="text-xl text-gray-700 mb-8">
        Presented by:{" "}
        <span className="font-semibold text-[#ed485e]">{presenterName}</span>
      </p>
      <p className="text-xl text-gray-700 mb-8">WOXSEN - LEAP 2025</p>

      <button
        onClick={onLaunchCalculator}
        className="
          mt-auto p-4 rounded-lg text-white font-semibold text-lg cursor-pointer
          bg-[#ed485e] hover:bg-[#d83c50] focus:outline-none focus:ring-2 focus:ring-[#ed485e] focus:ring-offset-2
          transition-all duration-200 ease-in-out shadow-md hover:shadow-lg w-3/4 
        "
      >
        Launch Calculator
      </button>
    </div>
  );
};

export default Showcase;
