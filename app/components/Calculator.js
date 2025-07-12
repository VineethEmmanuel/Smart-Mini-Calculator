"use client";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import Display from "./Display";
import KeyboardControlsModal from "./KeyboardControlsModal";

const Calculator = ({ onAddToHistory }) => {
  const [display, setDisplay] = useState("");
  const [expression, setExpression] = useState("");
  const [lastInputWasOperator, setLastInputWasOperator] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

  // --- Calculator Functions ---

  const handleNumberClick = (value) => {
    if (justCalculated) {
      setDisplay(value);
      setExpression(value);
      setJustCalculated(false);
    } else if (value === "." && display.includes(".")) {
      return;
    } else {
      setDisplay(display + value);
      setExpression(expression + value);
    }
    setLastInputWasOperator(false);
  };

  const handleOperatorClick = (operator) => {
    if (justCalculated) {
      setExpression(display + operator);
      setJustCalculated(false);
    } else if (lastInputWasOperator) {
      setExpression(expression.slice(0, -1) + operator);
    } else if (display === "" && expression === "") {
      return;
    } else {
      setExpression(expression + operator);
    }
    setDisplay(operator);
    setLastInputWasOperator(true);
  };

  const handleEqualsClick = () => {
    try {
      const cleanedExpression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .trim();

      if (!cleanedExpression) {
        setDisplay("");
        setExpression("");
        setJustCalculated(false);
        setLastInputWasOperator(false);
        return;
      }

      const parts = cleanedExpression.match(/(\d+\.?\d*)|([+\-*\/])/g);

      if (!parts || parts.length === 0) {
        setDisplay("Error");
        setExpression("");
        setJustCalculated(true);
        setLastInputWasOperator(false);
        return;
      }

      let currentResult = parseFloat(parts[0]);
      if (isNaN(currentResult)) {
        setDisplay("Error");
        setExpression("");
        setJustCalculated(true);
        setLastInputWasOperator(false);
        return;
      }

      for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const nextNumber = parseFloat(parts[i + 1]);

        if (isNaN(nextNumber)) {
          setDisplay("Error");
          setExpression("");
          setJustCalculated(true);
          setLastInputWasOperator(false);
          return;
        }

        switch (operator) {
          case "+":
            currentResult += nextNumber;
            break;
          case "-":
            currentResult -= nextNumber;
            break;
          case "*":
            currentResult *= nextNumber;
            break;
          case "/":
            if (nextNumber === 0) {
              setDisplay("Error: Div by 0");
              setExpression("");
              setJustCalculated(true);
              setLastInputWasOperator(false);
              return;
            }
            currentResult /= nextNumber;
            break;
            setDisplay("Error");
            setExpression("");
            setJustCalculated(true);
            setLastInputWasOperator(false);
            return;
        }
      }

      if (isNaN(currentResult) || !isFinite(currentResult)) {
        setDisplay("Error");
      } else {
        const finalResult = currentResult.toString();
        setDisplay(finalResult);
        setExpression(finalResult);

        if (onAddToHistory) {
          onAddToHistory({
            expression: cleanedExpression + " =",
            result: finalResult,
          });
        }
      }
      setJustCalculated(true);
      setLastInputWasOperator(false);
    } catch (error) {
      console.error("Calculation error:", error);
      setDisplay("Error");
      setExpression("");
      setJustCalculated(true);
      setLastInputWasOperator(false);
    }
  };

  const handleClearClick = () => {
    setDisplay("");
    setExpression("");
    setLastInputWasOperator(false);
    setJustCalculated(false);
  };

  const handleBackspaceClick = () => {
    if (display === "Error" || justCalculated) {
      handleClearClick();
      return;
    }
    if (expression.length > 0) {
      const newExpression = expression.slice(0, -1);
      setExpression(newExpression);
      if (newExpression === "") {
        setDisplay("");
      } else {
        const lastChar = newExpression[newExpression.length - 1];
        if (["+", "-", "*", "/", "×", "÷"].includes(lastChar)) {
          setDisplay(lastChar);
        } else {
          const match = newExpression.match(/(\d+\.?\d*)$/);
          setDisplay(match ? match[0] : "");
        }
      }
    } else {
      setDisplay("");
    }
    setJustCalculated(false);
    setLastInputWasOperator(false);
  };

  // --- Keyboard Functionality ---

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (
        ["Enter", "Backspace", "Escape", "+", "-", "*", "/"].includes(key) ||
        (key >= "0" && key <= "9") ||
        key === "."
      ) {
        event.preventDefault();
      }

      if (key >= "0" && key <= "9") {
        handleNumberClick(key);
      } else if (key === ".") {
        handleNumberClick(".");
      } else if (key === "+") {
        handleOperatorClick("+");
      } else if (key === "-") {
        handleOperatorClick("-");
      } else if (key === "*") {
        handleOperatorClick("×");
      } else if (key === "/") {
        handleOperatorClick("÷");
      } else if (key === "Enter") {
        handleEqualsClick();
      } else if (key === "Backspace") {
        handleBackspaceClick();
      } else if (key === "Escape" || key === "c" || key === "C") {
        handleClearClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [display, expression, lastInputWasOperator, justCalculated]);

  // --- Calculator Buttons Array ---
  const buttons = [
    {
      label: "C",
      type: "clear",
      className: "col-span-2 bg-rose-500 hover:bg-red-600 focus:ring-[#ed485e]",
    },

    {
      label: "DEL",
      type: "backspace",
      className: "bg-gray-500 hover:bg-gray-600 focus:ring-[#ed485e]",
    },

    {
      label: "÷",
      type: "operator",
      className:
        "bg-[#ed485e] hover:bg-[#d83c50] text-white focus:ring-[#ed485e]",
    },

    {
      label: "7",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: "8",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: "9",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: "×",
      type: "operator",
      className:
        "bg-[#ed485e] hover:bg-[#d83c50] text-white focus:ring-[#ed485e]",
    },
    {
      label: "4",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: "5",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: "6",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: "-",
      type: "operator",
      className:
        "bg-[#ed485e] hover:bg-[#d83c50] text-white focus:ring-[#ed485e]",
    },
    {
      label: "1",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: "2",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: "3",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: "+",
      type: "operator",
      className:
        "bg-[#ed485e] hover:bg-[#d83c50] text-white focus:ring-[#ed485e]",
    },
    {
      label: "0",
      type: "number",
      className:
        "col-span-2 bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },
    {
      label: ".",
      type: "number",
      className:
        "bg-white hover:bg-gray-100 text-gray-800 focus:ring-[#ed485e]",
    },

    {
      label: "=",
      type: "equals",
      className:
        "bg-[#ed485e] hover:bg-[#d83c50] text-white focus:ring-[#ed485e]",
    },
  ];

  return (
    <div
      className="
      bg-rose-300 shadow-2xl rounded-2xl p-6 w-full max-w-md
      transform transition-all duration-300
    "
    >
      <div className="flex mb-2 grid-cols-2 gap-2">
        <button
          onClick={() => setShowKeyboardModal(true)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
        transition-all duration-200 ease-in-out shadow-sm"
          aria-label="Show keyboard controls"
        >
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            id="icon"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs></defs>
            <title>keyboard</title>
            <path d="M28,26H4a2,2,0,0,1-2-2V10A2,2,0,0,1,4,8H28a2,2,0,0,1,2,2V24A2,2,0,0,1,28,26ZM4,10V24H28V10Z" />
            <rect x="10" y="20" width="11" height="2" />
            <rect x="6" y="12" width="2" height="2" />
            <rect x="10" y="12" width="2" height="2" />
            <rect x="14" y="12" width="2" height="2" />
            <rect x="18" y="12" width="2" height="2" />
            <rect x="6" y="20" width="2" height="2" />
            <rect x="6" y="16" width="2" height="2" />
            <rect x="10" y="16" width="2" height="2" />
            <rect x="14" y="16" width="2" height="2" />
            <rect x="22" y="12" width="4" height="2" />
            <rect x="22" y="16" width="4" height="2" />
            <rect x="18" y="16" width="2" height="2" />
            <rect x="23" y="20" width="3" height="2" />
            <rect
              id="_Transparent_Rectangle_"
              data-name=" Transparent Rectangle "
              className="fill-none"
              width="32"
              height="32"
            />
          </svg>
        </button>
        <h1 className="text-black font-bold self-center">
          SMART MINI CALCULATOR
        </h1>
      </div>
      <Display expression={expression} displayValue={display} />

      <div className="grid grid-cols-4 gap-4">
        {buttons.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            onClick={() => {
              if (button.type === "number") {
                handleNumberClick(button.label);
              } else if (button.type === "operator") {
                handleOperatorClick(button.label);
              } else if (button.type === "equals") {
                handleEqualsClick();
              } else if (button.type === "clear") {
                handleClearClick();
              } else if (button.type === "backspace") {
                handleBackspaceClick();
              }
            }}
            className={button.className}
          />
        ))}
      </div>
      {showKeyboardModal && (
        <KeyboardControlsModal onClose={() => setShowKeyboardModal(false)} />
      )}
    </div>
  );
};

export default Calculator;
