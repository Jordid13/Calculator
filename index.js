const number = document.createElement("p");
let userNumber = "";
const buildCalculator = () => {
  //Handle user clicks - logs them in the calculator screen and keep track of them in the userNumberArray
  const printNumber = (userInput) => {
    // Keeps track of the userInput in the userNumber variable
    const userDigits = userInput.srcElement.id;
    // Prints the digits to the calc screen
    if (number.textContent === "0" || number.textContent === "Error") {
      if (isNaN(userNumber)) {
        userNumber = userDigits;
        number.textContent = userDigits;
      } else {
        userNumber += userDigits;
        number.textContent = userDigits;
      }
    } else {
      userNumber += userDigits;
      number.textContent += userDigits;
    }
  };

  //Clears Calculator Screen (used only by the clear button)
  const clearScreen = (userInput) => {
    number.textContent = "0"; // Sets screen value to 0
    userNumber = ""; // Removes all items in the array if there were any
  };

  // Retrieves the calculator screen element
  const getScreen = document.querySelector("#screen");

  // Create a paragraph to store 0
  number.style.color = "white";
  number.textContent = 0;
  getScreen.appendChild(number);
  // Build buttons for the calculator
  // Retrieves the numPad element
  const getNumPad = document.querySelector("#numPad");
  // Create symbol buttons and append them to the numPad div
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
    // Listens for clicks
    button.addEventListener("click", printNumber);
    // Appends
    getNumPad.appendChild(button);
  }
  // Create number buttons and append them to the numPad div
  const numberArr = [6, 7, 8, 9, 5, 4, 3, 2, 1, 0]; // This should be divided in three rows of three items each
  for (let i = 0; i < numberArr.length; i++) {
    let button = document.createElement("button");
    button.textContent = numberArr[i];
    button.id = numberArr[i];
    button.classList = "num";
    // Listens for clicks
    button.addEventListener("click", printNumber);
    // Appends
    getNumPad.appendChild(button);
  }

  //Create equal button
  let equalButton = document.createElement("button");
  equalButton.textContent = "=";
  equalButton.id = "equal";
  equalButton.classList = "equal-button";
  getNumPad.appendChild(equalButton);

  //Create reset button
  let resetButton = document.createElement("button");
  resetButton.textContent = "C";
  resetButton.id = "clear";
  resetButton.classList = "reset-button";
  resetButton.addEventListener("click", clearScreen);
  getNumPad.appendChild(resetButton);
};

const handleUserInput = () => {
  // Retrieves equal button
  const equalButton = document.getElementById("equal");
  //   const currentResult = 0; // WIP
  //   const sum = () => {
  //     const sum = userNumber
  //       .split("+")
  //       .map((element) => Number(element))
  //       .reduce((acc, curr) => acc + curr);
  //     number.textContent = sum;
  //   };

  //   const subtraction = () => {
  //     const sub = userNumber
  //       .split("-")
  //       .map((element) => Number(element))
  //       .reduce((acc, curr) => acc - curr);
  //     number.textContent = sub;
  //   };

  //   const multiplication = () => {
  //     const mul = userNumber
  //       .split("*")
  //       .map((element) => Number(element))
  //       .reduce((acc, curr) => acc * curr);
  //     number.textContent = mul;
  //   };

  //   const division = () => {
  //     const mul = userNumber
  //       .split("/")
  //       .map((element) => Number(element))
  //       .reduce((acc, curr) => acc / curr);
  //     number.textContent = mul;
  //   };

  //   const calculations = () => {
  //     if (userNumber.includes("+")) sum();
  //     if (userNumber.includes("-")) subtraction();
  //     if (userNumber.includes("*")) multiplication();
  //     if (userNumber.includes("/")) division();
  //   };

  const calculations = () => {
    try {
      eval(userNumber);
    } catch (error) {
      if (error instanceof SyntaxError) {
        number.textContent = `Error`;
      }
    } finally {
      number.textContent = eval(userNumber);
      userNumber = eval(userNumber);
    }
  };

  // Listens for clicking and calls the calculations function
  equalButton.addEventListener("click", calculations);
};

const main = () => {
  buildCalculator();
  handleUserInput();
};

main();
