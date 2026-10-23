const display = document.getElementById("display");
const previousDisplay = document.getElementById("previous-display");
const buttons = document.querySelector(".buttons");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let finished = false;

function updateDisplay() {
    display.value = currentInput;
}

function formatNumber(number) {
    if (!Number.isFinite(number)) {
        return "Error";
    }

    return String(Number(number.toPrecision(12)));
}

function clearCalculator() {
    currentInput = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    finished = false;

    previousDisplay.textContent = "";
    updateDisplay();
}

function calculate() {
    if (firstNumber === null || operator === null) {
        return;
    }

    const secondNumber = Number(currentInput);
    let result;

    if (operator === "/" && secondNumber === 0) {
        currentInput = "Cannot divide by zero";
        previousDisplay.textContent = "";
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = true;
        finished = true;
        updateDisplay();
        return;
    }

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    previousDisplay.textContent =
        `${formatNumber(firstNumber)} ${operator} ${formatNumber(secondNumber)} =`;

    currentInput = formatNumber(result);

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
    finished = true;

    updateDisplay();
}

function chooseOperator(nextOperator) {
    if (currentInput === "Cannot divide by zero" ||
        currentInput === "Error") {
        clearCalculator();
    }

    if (operator && !waitingForSecondNumber) {
        calculate();

        if (currentInput === "Cannot divide by zero" ||
            currentInput === "Error") {
            return;
        }
    }

    firstNumber = Number(currentInput);
    operator = nextOperator;

    previousDisplay.textContent =
        `${formatNumber(firstNumber)} ${nextOperator}`;

    waitingForSecondNumber = true;
    finished = false;
}

buttons.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    // Number buttons
    if (button.dataset.number !== undefined) {
        const number = button.dataset.number;

        if (currentInput === "Cannot divide by zero" ||
            currentInput === "Error") {
            clearCalculator();
        }

        if (finished) {
            currentInput = number;
            previousDisplay.textContent = "";
            finished = false;
        } else if (waitingForSecondNumber) {
            currentInput = number;
            waitingForSecondNumber = false;
        } else {
            currentInput = currentInput === "0"
                ? number
                : currentInput + number;
        }

        updateDisplay();
        return;
    }

    // Operator buttons
    if (button.dataset.operator !== undefined) {
        chooseOperator(button.dataset.operator);
        updateDisplay();
        return;
    }

    // Other buttons
    switch (button.dataset.action) {
        case "clear":
            clearCalculator();
            return;

        case "delete":
            if (finished || waitingForSecondNumber ||
                currentInput === "Cannot divide by zero" ||
                currentInput === "Error") {
                currentInput = "0";
                finished = false;
                waitingForSecondNumber = false;
            } else {
                currentInput = currentInput.length > 1
                    ? currentInput.slice(0, -1)
                    : "0";
            }
            break;

        case "decimal":
            if (currentInput === "Cannot divide by zero" ||
                currentInput === "Error") {
                clearCalculator();
            }

            if (finished || waitingForSecondNumber) {
                currentInput = "0.";
                finished = false;
                waitingForSecondNumber = false;
            } else if (!currentInput.includes(".")) {
                currentInput += ".";
            }
            break;

        case "calculate":
            calculate();
            return;
    }

    updateDisplay();
});

// Start with a clean calculator
updateDisplay();