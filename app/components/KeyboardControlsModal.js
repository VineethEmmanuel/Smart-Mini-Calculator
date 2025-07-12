import React from "react";

const KeyboardControlsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-20 flex items-center justify-center p-4 z-50">
      <div
        className="
        bg-white rounded-lg shadow-xl p-8 w-full h-full max-w-2xl max-h-[90vh] relative
        flex flex-col // Use flexbox for internal layout
      "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 z-10" // Ensure close button is on top
          aria-label="Close keyboard controls"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Keyboard Controls
        </h2>

        {/* Scrollable content area for controls */}
        <div className="flex-grow overflow-y-auto pr-4 space-y-4 text-gray-700">
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Numbers (0-9)</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md text-base font-mono min-w-[80px] text-center">
              0-9
            </span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Decimal Point</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md text-base font-mono min-w-[80px] text-center">
              .
            </span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Add</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md text-base font-mono min-w-[80px] text-center">
              +
            </span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Subtract</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md text-base font-mono min-w-[80px] text-center">
              -
            </span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Multiply</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md text-base font-mono min-w-[80px] text-center">
              *
            </span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Divide</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md text-base font-mono min-w-[80px] text-center">
              /
            </span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Equals</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md text-base font-mono min-w-[80px] text-center">
              Enter
            </span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Backspace / Delete Last</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md text-base font-mono min-w-[80px] text-center">
              Backspace
            </span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Clear All</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md text-base font-mono min-w-[80px] text-center">
              Esc or C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardControlsModal;
