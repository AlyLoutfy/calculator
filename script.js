const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const percentButton = document.getElementById('percentBtn');
const pointButton = document.getElementById('pointBtn');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const equalButton = document.getElementById('equalBtn');
const currentOperation = document.getElementById('currentOperation');
const output = document.getElementById('output');

let shouldReset = false;
let operator = ''; 
let firstNum;
let secondNum = '';

clearButton.addEventListener('click', eraseScreen);
deleteButton.addEventListener('click', deleteVal);
percentButton.addEventListener('click', percent);
pointButton.addEventListener('click', addPoint);
equalButton.addEventListener('click', displayResult);

numberButtons.forEach((btn) => 
  btn.addEventListener('click', () => appendNum(btn.textContent))
);

operatorButtons.forEach((btn) => 
  btn.addEventListener('click', () => setOperator(btn.textContent))
);

function appendNum(num) {
  if(currentOperation.textContent === '0' || shouldReset)
    eraseScreen();
  
  currentOperation.textContent += num;
  if (operator != '')
    secondNum += num;
}

function getFirstNumber() {
  firstNum = currentOperation.textContent;
}

function setOperator(op) {
  if (operator != '') {
    displayResult();
    firstNum = output.textContent;
    secondNum = '';
  } else {
    getFirstNumber();
  }

  operator = op;
  currentOperation.textContent = `${firstNum} ${operator} `;
}

function addPoint() {
  currentOperation.textContent += '.';
}

let percentInt = 0;

function percent() {
  percentInt += 2;
  let temp = currentOperation.textContent / 100;
  currentOperation.textContent = temp.toFixed(percentInt);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(op, x, y) {
  if (op === "+") {
    return add(x,y);
  } else if (op === "-") {
    return subtract(x,y);
  } else if (op === "x") {
    return multiply(x,y);
  } else if (op === "÷") {
    return divide(x,y);
  } else {
    return "NaN";
  }
}

function getLength(number) {
  return number.toString().length;
}

function displayResult() {
  console.log(firstNum)
  console.log(secondNum)
  let result = operate(operator, Number(firstNum), Number(secondNum));
  let length = getLength(result);

  output.textContent = result;

  // shouldReset = true;
}

function eraseScreen() {
  currentOperation.textContent = '';
  output.textContent = 0;
  firstNum = 0;
  secondNum = '';
  operator = '';
  percentInt = 0;
  shouldReset = false;
}

function deleteVal() {
  let currVal = currentOperation.textContent;
  let temp = Number(currVal);
  currentOperation.textContent = Math.floor(temp / 10);
}