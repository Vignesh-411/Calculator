import React, { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("normal"); 

  const handleInput = (value) => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      setInput(eval(input).toString()); // eslint-disable-line
    } catch (error) {
      setInput("Error");
    }
  };

  const handleScientificOperation = (operation) => {
    try {
      let result;
      const currentInput = parseFloat(input);

      switch (operation) {
        case "sqrt":
          result = Math.sqrt(currentInput);
          break;
        case "sin":
          result = Math.sin(currentInput);
          break;
        case "cos":
          result = Math.cos(currentInput);
          break;
        case "tan":
          result = Math.tan(currentInput);
          break;
        case "pow2":
          result = Math.pow(currentInput, 2);
          break;
        case "pow3":
          result = Math.pow(currentInput, 3);
          break;
        default:
          result = currentInput;
      }

      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const deleteLastCharacter = () => {
    setInput(input.slice(0, -1));
  };

  const handlePercentage = () => {
    setInput((parseFloat(input) / 100).toString());
  };

  const toggleSign = () => {
    setInput((parseFloat(input) * -1).toString());
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "normal" ? "scientific" : "normal"));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isNaN(e.key) || ["+", "-", "*", "/"].includes(e.key)) {
        handleInput(e.key);
      } else if (e.key === "Enter") {
        calculateResult();
      } else if (e.key === "Escape") {
        clearInput();
      } else if (e.key === "Backspace") {
        deleteLastCharacter();
      } else if (e.key === ".") {
        handleInput(".");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]); // eslint-disable-line

  return (
    <div className={`calculator ${mode === "scientific" ? "scientific-mode" : ""}`}>
      <div className="display">{input || "0"}</div>     

      <div className="buttons">
        <button onClick={clearInput}>AC</button>
        <button onClick={deleteLastCharacter}>DEL</button>
        <button onClick={handlePercentage}>%</button>
        <button onClick={toggleSign}>+/-</button>

        {mode === "scientific" && (
          <>
            <button onClick={() => handleInput("(")}>(</button>
                <button onClick={() => handleInput(")")}>)</button>
            <button onClick={() => handleScientificOperation("sqrt")}>√</button>
            <button onClick={() => handleScientificOperation("sin")}>sin</button>
            <button onClick={() => handleScientificOperation("cos")}>cos</button>
            <button onClick={() => handleScientificOperation("tan")}>tan</button>
            <button onClick={() => handleScientificOperation("pow2")}>x²</button>
            <button onClick={() => handleScientificOperation("pow3")}>x³</button>
          </>
        )}

        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button onClick={() => handleInput("/")}>/</button>

        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button onClick={() => handleInput("*")}>*</button>

        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button onClick={() => handleInput("-")}>-</button>

        <button onClick={() => handleInput("00")}>00</button>
        <button onClick={() => handleInput("0")}>0</button>
        <button onClick={() => handleInput(".")}>.</button>
        <button onClick={() => handleInput("+")}>+</button>

        <div className="mode-toggle">
        <button onClick={toggleMode}>
          {mode === "normal" ? "Scientific" : "Normal"}
        </button>
      </div>
        <button onClick={calculateResult} className="equal-button">=</button>
      </div>
    </div>
  );
};

export default Calculator;

