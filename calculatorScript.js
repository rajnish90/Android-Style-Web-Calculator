document.addEventListener("DOMContentLoaded", () => {
  const resultInput = document.querySelector(".result");
  const buttons = document.querySelectorAll(".buttons button");
  const toggleModeBtn = document.getElementById("toggleMode");

  let expression = "";

  function updateDisplay() {
    resultInput.value = expression;
  }

  function safeEval(expr) {
  try {
    // Replace percentage: e.g., 50% → (50/100)
    expr = expr.replace(/(\d+)%/g, "($1/100)");

    // Remove leading zeros from numbers, but keep "0" alone valid
    expr = expr.replace(/\b0+(\d+)/g, "$1");

    // Evaluate the expression using Function constructor (safer than eval)
    return Function(`"use strict"; return (${expr})`)();
  } catch {
    return "Error";
  }
}


  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      let val = btn.textContent.trim();
      const operatorMap = {
        "÷": "/",
        "×": "*",
      };

      if (operatorMap[val]) {
        val = operatorMap[val];
      }

      if (val === "AC") {
        expression = "";
        updateDisplay();
        return;
      }

      if (val === "CE") {
        expression = expression.slice(0, -1);
        updateDisplay();
        return;
      }

      if (val === "=") {
        if (!expression) return;
        const res = safeEval(expression);
        expression = res === undefined ? "" : String(res);
        updateDisplay();
        return;
      }

      if (val === "✓") {
        if (!expression) return;
        const res = safeEval(expression);
        if (typeof res === "number" && res >= 0) {
          expression = String(Math.sqrt(res));
        } else {
          expression = "Error";
        }
        updateDisplay();
        return;
      }
      const operators = ["+", "-", "*", "/", "%"];

      if (
        operators.includes(val) &&
        expression.length > 0 &&
        operators.includes(expression.slice(-1))
      ) {
        // Replace last operator with new operator
        expression = expression.slice(0, -1) + val;
        updateDisplay();
        return;
      }
      if (val === ".") {
        const parts = expression.split(/[\+\-\*\/%]/);
        const currentNumber = parts[parts.length - 1];
        if (currentNumber.includes(".")) {
          return; // ignore second dot
        }
      }

      expression += val;
      updateDisplay();
    });
  });

  toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      toggleModeBtn.textContent = "🌙";
    } else {
      toggleModeBtn.textContent = "☀️";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const resultInput = document.querySelector(".result");
  const buttons = document.querySelectorAll(".buttons button");
  const toggleModeBtn = document.getElementById("toggleMode");

  let expression = "";

  function updateDisplay() {
    resultInput.value = expression;
    resultInput.scrollLeft = resultInput.scrollWidth;
  }

  function safeEval(expr) {
    try {
      expr = expr.replace(/(\d+)%/g, "($1/100)");
      expr = expr.replace(/\b0+(\d+)/g, "$1");
      return Function(`"use strict"; return (${expr})`)();
    } catch {
      return "Error";
    }
  }

  // Handle button clicks
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      handleInput(btn.textContent.trim());
    });
  });

  // Handle keyboard input
  document.addEventListener("keydown", (e) => {
    const allowedKeys = "0123456789.+-*/%";
    const key = e.key;

    if (allowedKeys.includes(key)) {
      e.preventDefault();  // prevent default input for consistent behavior
      handleInput(key);
    } else if (key === "Enter") {
      e.preventDefault();
      handleInput("=");
    } else if (key === "Backspace") {
      e.preventDefault();
      handleInput("CE");
    } else if (key.toLowerCase() === "c") {
      // 'c' for clear all
      e.preventDefault();
      handleInput("AC");
    } else if (key === "Escape") {
      e.preventDefault();
      handleInput("AC");
    }
  });

  // Main input handler (button or keyboard)
  function handleInput(val) {
    const operatorMap = {
      "÷": "/",
      "×": "*",
    };

    if (operatorMap[val]) {
      val = operatorMap[val];
    }

    if (val === "AC") {
      expression = "";
      updateDisplay();
      return;
    }

    if (val === "CE") {
      expression = expression.slice(0, -1);
      updateDisplay();
      return;
    }

    if (val === "=") {
      if (!expression) return;
      const res = safeEval(expression);
      expression = res === undefined ? "" : String(res);
      updateDisplay();
      return;
    }

    if (val === "✓") {
      if (!expression) return;
      const res = safeEval(expression);
      if (typeof res === "number" && res >= 0) {
        expression = String(Math.sqrt(res));
      } else {
        expression = "Error";
      }
      updateDisplay();
      return;
    }

    const operators = ["+", "-", "*", "/", "%"];

    if (
      operators.includes(val) &&
      expression.length > 0 &&
      operators.includes(expression.slice(-1))
    ) {
      expression = expression.slice(0, -1) + val;
      updateDisplay();
      return;
    }

    if (val === ".") {
      const parts = expression.split(/[\+\-\*\/%]/);
      const currentNumber = parts[parts.length - 1];
      if (currentNumber.includes(".")) {
        return;
      }
    }

    expression += val;
    updateDisplay();
  }

  toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleModeBtn.textContent = document.body.classList.contains("dark-mode")
      ? "🌙"
      : "☀️";
  });
});
