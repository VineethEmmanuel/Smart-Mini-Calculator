import React from "react";

const History = ({ history, onClearHistory, onDeleteItem, showCalculator }) => {
  return (
    <div className="w-full flex flex-col h-full">
      <h2 className="text-2xl font-bold text-center mb-6">
        {showCalculator ? "Calculation History" : "Welcome"}
      </h2>

      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {history.length === 0 ? (
          <p className="text-gray-200 text-sm text-center mt-4">
            {showCalculator ? "" : "Launch the calculator to start!"}
          </p>
        ) : (
          <ul className="space-y-3">
            {history.map((item, index) => (
              <li
                key={index}
                className="
                bg-white bg-opacity-10 p-3 rounded-md text-white text-sm break-words shadow-sm
                flex justify-between items-center
                opacity-0 animate-fadeInUp
              "
              >
                <div className="flex-grow">
                  {" "}
                  <div className="font-semibold text-black">
                    {item.expression}
                  </div>
                  <div className="text-right text-black font-bold text-2xl mt-1">
                    {item.result}
                  </div>
                </div>

                <button
                  onClick={() => onDeleteItem(index)}
                  className="
                    ml-4 p-1 rounded-full bg-red-400 text-white text-xs font-bold
                    hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-[#ed486e]
                    transition-all duration-200 ease-in-out
                    w-6 h-6 flex items-center justify-center 
                  "
                  aria-label={`Delete ${item.expression} = ${item.result}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {history.length > 0 && (
        <button
          onClick={onClearHistory}
          className="mt-6 w-full p-3 rounded-lg bg-white text-[#ed486e] font-semibold
                     hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                     transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default History;
