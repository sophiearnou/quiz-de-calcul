const scoreEl = $("#score");
const operatorEl = $(".operator");
const levelEl = $(".level");
const quizStatementEl = $("#quiz-statement");
const quizForm = $(".quiz-form");
const answerEl = $("#answer");
const resultEl = $("#result");

const data = {
    num1: 1,
    num2: 2
};

operatorEl.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
        return;
    }
    data.operator = event.target.value;
});

levelEl.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
        return; // undefined
    }
    data.level = event.target.value;
    data.num1 = getNumberByLevel(data.level);
    data.num2 = getNumberByLevel(data.level);
    displayStatement();
});

quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = compute(data.operator, data.num1, data.num2);
    if (Number(answerEl.value) !== result) {
        resultEl.innerHTML = "Try again";
        return;
    }
    resultEl.innerHTML = "Good job";
});

/* ***** */

function $(selector) {
    return document.querySelector(selector);
}

const levels = {
    0: 0,
    1: 10,
    2: 100,
    3: 1000,
    4: 10000,
    5: 100000
};

function getNumberByLevel(level) {
    const min = levels["" + level - 1];
    const max = levels[level];
    return getRandomNumber(min, max);
}

function getRandomNumber(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function displayStatement() {
    quizStatementEl.innerHTML = `${data.num1} ${data.operator} ${data.num2}`;
}

function compute(operator, num1, num2) {
    const operation = getOperation(operator);
    return operation(num1, num2);
}

function getOperation(operator) {
    switch (operator) {
        case "+":
            return function(a, b) {
                return a + b;
            };
        case "-":
            return function(a, b) {
                return a - b;
            };
        case "*":
            return function(a, b) {
                return a * b;
            };
        case "/":
            return function(a, b) {
                return a / b;
            };
        default:
            return;
    }
}