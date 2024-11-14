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
      numberDisplayed.textContent += currUserNumber;
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
  const display = document.querySelector("#screen");
  // Store numbers in a paragraph
  numberDisplayed.textContent = 0;
  // Append the 0 to the display
  display.appendChild(numberDisplayed);
  // ---- Retrieves the numPad element for the buttons -----
  const getNumPad = document.querySelector("#numPad");
  // ---- Create Buttons for Operators -----
  const operatorButtons = () => {
    const symbolArr = ["+", "-", "*", "/"];
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
      getNumPad.appendChild(button);
    }
  };

  // ---- Create Buttons for Numbers -----
  const numButtons = () => {
    const numberArr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    for (let i = 0; i < numberArr.length; i++) {
      let button = document.createElement("button");
      button.textContent = numberArr[i];
      button.id = numberArr[i];
      button.classList = "num";
      button.addEventListener("click", updateScreen);
      button.addEventListener("click", inputHandler);
      getNumPad.appendChild(button);
    }
  };

  // ---- Create Equal Button -----
  const equalButton = () => {
    const equalButton = document.createElement("button");
    equalButton.textContent = "=";
    equalButton.id = "equal";
    equalButton.classList = "equal-button";
    getNumPad.appendChild(equalButton);
    equalButton.addEventListener("click", operationsHandler);
  };

  // ---- Create Reset Button -----
  const clearButton = () => {
    const resetButton = document.createElement("button");
    resetButton.textContent = "C";
    resetButton.id = "clear";
    resetButton.classList = "reset-button";
    resetButton.addEventListener("click", () => {
      clearUserExpression();
      numberDisplayed.textContent = 0;
    });
    getNumPad.appendChild(resetButton);
  };
  operatorButtons();
  numButtons();
  equalButton();
  clearButton();
};

buildCalculator();
