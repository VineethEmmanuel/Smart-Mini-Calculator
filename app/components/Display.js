import React from "react";

const Display = ({ expression, displayValue }) => {
  return (
    <div className="bg-gray-800 text-white text-right p-4 mb-6 rounded-lg shadow-inner overflow-hidden">
      <div className="text-gray-400 text-sm h-5 overflow-hidden whitespace-nowrap">
        {expression}
      </div>

      <div className="text-4xl font-light h-12 flex items-center justify-end">
        {displayValue === "" ? "0" : displayValue}
      </div>
    </div>
  );
};

export default Display;
