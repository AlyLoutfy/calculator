const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const equalButton = document.getElementById('equalBtn');
const currentOperation = document.getElementById('currentOperation');
const output = document.getElementById('output');

let operator = ''; 
let firstNum;
let secondNum = '';

clearButton.addEventListener('click', eraseScreen);
deleteButton.addEventListener('click', deleteVal);
equalButton.addEventListener('click', displayResult);

numberButtons.forEach((btn) => 
  btn.addEventListener('click', () => appendNum(btn.textContent))
);

operatorButtons.forEach((btn) => 
  btn.addEventListener('click', () => setOperator(btn.textContent))
);

function appendNum(num) {
  if(currentOperation.textContent === '0')
    eraseScreen();
  
  currentOperation.textContent += num;
  if (operator != '')
    secondNum += num;
}

function getFirstNumber() {
  firstNum = currentOperation.textContent;
}

function setOperator(op) {
  getFirstNumber();
  operator = op;
  currentOperation.textContent = `${firstNum} ${operator} `;
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
    return "Operation not available";
  }
}

function displayResult() {
  let result = operate(operator, Number(firstNum), Number(secondNum));
  output.textContent = result;
}

function eraseScreen() {
  currentOperation.textContent = '';
  output.textContent = 0;
  firstNum = 0;
  secondNum = '';
  operator = '';
}

function deleteVal() {
  let currVal = currentOperation.textContent;
  let temp = Number(currVal);
  currentOperation.textContent = Math.floor(temp / 10);
}