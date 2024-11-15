const numberDisplayed = document.createElement("p");
let userExpression = "";
let resultState = 0;

const clearUserExpression = () => {
  userExpression = "";
};

const updateScreen = (userInput) => {
  const currUserNumber = userInput.target.id;
  const lastValue = userExpression.slice(-1);
  if (resultState) {
  }
  if (
    (!isNaN(currUserNumber) && numberDisplayed.textContent === "0") ||
    (!isNaN(currUserNumber) && resultState)
  ) {
    numberDisplayed.textContent = currUserNumber;
    resultState = 0;
  } else if (!isNaN(currUserNumber)) {
    numberDisplayed.textContent += currUserNumber;
  } else if (
    isNaN(currUserNumber) &&
    !isNaN(lastValue) &&
    lastValue !== currUserNumber
  ) {
    if (lastValue && isNaN(currUserNumber)) {
      switch (currUserNumber) {
        case "*":
          numberDisplayed.textContent += "×";
          break;
        case "/":
          numberDisplayed.textContent += "÷";
          break;
        default:
          numberDisplayed.textContent += currUserNumber;
          break;
      }
    }
  }
};

const inputHandler = (userInput) => {
  const currUserNumber = userInput.target.id;
  const lastValue = userExpression.slice(-1);

  if (!isNaN(currUserNumber) && lastValue !== 0)
    userExpression += currUserNumber;
  if (
    isNaN(currUserNumber) &&
    !isNaN(lastValue) &&
    lastValue !== currUserNumber
  ) {
    if (lastValue && isNaN(currUserNumber)) {
      userExpression += currUserNumber;
    }
  }
};

const operationsHandler = () => {
  const arr = strToArr(userExpression);
  const lastValue = userExpression.slice(-1);
  if (arr.length >= 3 && !isNaN(lastValue)) {
    const postFix = infixToPostFix(arr);
    const result = resolvePostFix(postFix);
    numberDisplayed.textContent = result;
    resultState = result;
    clearUserExpression();
  }
};

const buildCalculator = () => {
  // Retrieves the calculator screen element
  const getDisplay = document.querySelector("#screen");
  // Store numbers in a paragraph
  numberDisplayed.textContent = 0;
  // Append the 0 to the display
  getDisplay.appendChild(numberDisplayed);
  // ---- Retrieves the numPad element for the buttons -----
  const getNumPad = document.querySelector("#numPad");
  const optionsDiv = document.querySelector("#options");
  // ---- Create Buttons for Operators -----
  const operatorButtons = () => {
    const symbolArr = ["+", "-", "*", "/"];
    const operatorDiv = document.createElement("div");
    operatorDiv.id = "operators";
    for (let i = 0; i < symbolArr.length; i++) {
      let button = document.createElement("button");
      if (symbolArr[i] === "*") {
        button.textContent = "×";
      } else if (symbolArr[i] === "/") {
        button.textContent = "÷";
      } else {
        button.textContent = symbolArr[i];
      }
      button.id = symbolArr[i];
      button.classList = "symbol";
      button.addEventListener("click", updateScreen);
      button.addEventListener("click", inputHandler);
      operatorDiv.appendChild(button);
    }
    getNumPad.appendChild(operatorDiv);
  };

  // ---- Create Buttons for Numbers -----
  const numButtons = () => {
    const numberArr = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
    const numbersDiv = document.createElement("div");
    numbersDiv.id = "numbers";
    for (let i = 0; i < numberArr.length; i++) {
      let button = document.createElement("button");
      button.textContent = numberArr[i];
      button.id = numberArr[i];
      button.classList = "num";
      button.addEventListener("click", updateScreen);
      button.addEventListener("click", inputHandler);
      numbersDiv.appendChild(button);
    }
    getNumPad.appendChild(numbersDiv);
  };

  // ---- Create Option Buttons -----
  const optionButtons = () => {
    const equalButton = document.createElement("button");
    equalButton.textContent = "=";
    equalButton.id = "equal";
    equalButton.classList = "equal-button";
    optionsDiv.appendChild(equalButton);
    equalButton.addEventListener("click", operationsHandler);
    const resetButton = document.createElement("button");
    resetButton.textContent = "C";
    resetButton.id = "clear";
    resetButton.classList = "reset-button";
    resetButton.addEventListener("click", () => {
      clearUserExpression();
      numberDisplayed.textContent = 0;
    });
    optionsDiv.appendChild(resetButton);
  };
  optionButtons();
  operatorButtons();
  numButtons();
};

buildCalculator();
