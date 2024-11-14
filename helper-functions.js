const strToArr = (str) => {
  let currNum = "";
  const output = [];
  for (let i = 0; i < str.length; i++) {
    if (isNaN(str[i])) {
      output.push(currNum);
      currNum = "";
      output.push(str[i]);
    }
    if (!isNaN(str[i])) {
      currNum += str[i];
    }
  }
  if (currNum) output.push(currNum);
  return output;
};

const infixToPostFix = (arr) => {
  const precedence = {
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2,
  };
  const operatorStack = [];
  let postFixExpression = [];
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      postFixExpression.push(arr[i]);
    }
    if (isNaN(arr[i])) {
      if (operatorStack.length > 1) {
        while (
          precedence[operatorStack[operatorStack.length - 1]] >=
          precedence[arr[i]]
        ) {
          postFixExpression.push(operatorStack.pop());
        }
      }
      operatorStack.push(arr[i]);
    }
  }
  while (operatorStack.length !== 0) {
    postFixExpression.push(operatorStack.pop());
  }
  return postFixExpression;
};

const resolvePostFix = (postFix) => {
  const output = [];
  for (let i = 0; i < postFix.length; i++) {
    if (!isNaN(postFix[i])) {
      output.push(Number(postFix[i]));
    }
    if (isNaN(postFix[i])) {
      const right = output.pop();
      const left = output.pop();
      switch (postFix[i]) {
        case "*":
          output.push(right * left);
          break;
        case "/":
          const result = left / right;
          if (result === Math.floor(result)) {
            output.push(result);
          } else {
            output.push(result.toFixed(2));
          }
          break;
        case "+":
          output.push(right + left);
          break;
        case "-":
          output.push(left - right);
          break;
        default:
          console.log("error");
      }
    }
  }
  return output.join();
};
