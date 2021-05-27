const scoreEl = getElement("#score");
const operatorEl = getElement(".operator");
const levelEl = getElement(".level");
const resultEl = getElement("#result");
const quizStatementEL = getElement("#quiz-statement");
const resultEL = getElement("#quiz-statement");
const quizFormEl = getElement(".quiz-form");
const answerEl = getElement("#answer");
const selectedOperatorEl = getElement(".selectedOperator");
const selectedLevelEl = getElement(".selectedLevel");
const selectedScoreEl = getElement(".selectedScore");
const goodAnswersEl = getElement("#goodAnswers");
const questionsEl = getElement("#questions");
const maxQuestion = 10;
//objet permettant de calculer le score
const score = {
    //nbre de bonne réponses
    goodAnswers: 0,
    //nbre de questions répondu
    questions: 0,
};

const data = {
    num1: 1,
    num2: 2,
    level: 1,
    operator: "+",
};

//affiche le max question
questionsEl.innerHTML = maxQuestion;

//1_ on crée une fonction pour éviter de répéter le code
//selector le paramètre passé donc #score ou .operator....
function getElement(selector) {
    return document.querySelector(selector);
}

//2_ on récupère l'operator
//({ target }) -> on dit qu'on veut récupérer le target de event
operatorEl.addEventListener("click", ({ target }) => {
    const { value, tagName } = target;
    // console.info(data);
    //console= {num1: 1, num2: 2}

    if (tagName !== "BUTTON") {
        return;
    }
    //Slectect ts les btn qui ont la class btn-small et active
    const activeButton = operatorEl.querySelector(".small-btn.active");
    // console.log(activeButton); //null

    //si il y a unb btn avec .active, alors on la retire
    activeButton ? activeButton.classList.remove("active") : "";

    //ajoute la classe .active au boutton sur lequel on a cliqué
    //La méthode element.matches() renvoie true lorsque l'élément peut être sélectionné par le sélecteur défini par la chaîne passée en paramêtre; sinon, elle renvoie false
    if (target.matches("button.small-btn")) {
        target.classList.add("active");
    }
    // operatorEl.add.classList("show");
    //on rajoute une clé à l'objet data
    data.operator = value;

    //console.log(target);
    //console.log(data);
    //console={num1: 1, num2: 2, operator: "-"}
    getRandomNumbersByLevel();
});
//3_ on récupère le level
levelEl.addEventListener("click", ({ target }) => {
    //je veux récupérer value et tagname de target
    const { value, tagName } = target;

    if (tagName !== "BUTTON") {
        return;
    }
    //on rajoute une clé et la valeur du level à l'objet data
    data.level = value;
    //console.log(data);
    //console={num1: 1, num2: 2, level: "5"} level: "5" si on click sur le 5

    //Slectect ts les btn qui ont la class btn-small et active
    const activeButton = levelEl.querySelector(".small-btn.active");
    //console.log(activeButton); //null

    //si il y a unb btn avec .active, alors on la retire
    activeButton ? activeButton.classList.remove("active") : "";

    //ajoute la classe .active au boutton sur lequel on a cliqué
    //La méthode element.matches() renvoie true lorsque l'élément peut être sélectionné par le sélecteur défini par la chaîne passée en paramêtre; sinon, elle renvoie false
    if (target.matches("button.small-btn")) {
        target.classList.add("active");
    }

    getRandomNumbersByLevel();
});
//11 fonction qui récupère un nombre alléatoire par level
function getRandomNumbersByLevel() {
    //recupère un nbre alléatoire en fonction du niveau
    data.num1 = getNumberByLevel(data.level);
    data.num2 = getNumberByLevel(data.level);
    //console.log(data.num1);

    //on affiche les infos de valeur par défaut operator et level
    selectedOperatorEl.innerHTML = data.operator;
    selectedLevelEl.innerHTML = data.level;
    selectedOperatorEl.style.color = "#862e6c";
    selectedLevelEl.style.color = "#862e6c";

    //7a_on affiche
    displayStatement();
}

//4_ on crée un objet qui va stock les levels
const levels = {
    0: 0,
    1: 10,
    2: 100,
    3: 1000,
    4: 10000,
    5: 100000,
};

//5_on crée une fonction pour obtenir le numéro par niveau
function getNumberByLevel(level) {
    const min = levels["" + level - 1];
    const max = levels[level];
    return getRandomNumber(min, max);
}

//6_On renvoie un nombre aléatoire entre une valeur min (incluse)
// et une valeur max (exclue)
function getRandomNumber(min, max) {
    //renvoie un nbre arondi
    return Math.ceil(Math.random() * (max - min) + min);
}

//7_fonction pour déclaration d'affichage
function displayStatement() {
    quizStatementEL.innerHTML = `${data.num1} ${data.operator} ${data.num2}`;
}

//8_on crée une fonction qui retourne les opérations avec un switch
const operations = {
    x: (a, b) => a * b,
    "/": (a, b) => a / b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
};

//récupère l'opérateur
function getOperation(operator) {
    const defaultFn = () => NaN;
    //retourne un tableau de string avec un tableau
    const validOperators = Object.keys(operations);

    if (!validOperators.includes(operator)) {
        return defaultFn;
    }
    return operations[operator];
}

//10_on stock result et quizForm et la réponse de l'utilisateur
//on écoute l'event du submit
quizFormEl.addEventListener("submit", (event) => {
    //1 solution si on arrive à 20
    /*if (score.questions==maxQuestion) {
                  return
              }
              //2 on entoure d'un if const feeback jusqu'à la fin donc if(isRight)
              //3 on se dit quand il arrive à la fin on veut plus de soumission,, donc on désactive le submit data.deasable=true*/
    //on empêche la soumission du formulaire on veut rester sur la page
    event.preventDefault();
    //on stock la reponse
    const answer = Number(answerEl.value);
    //à chaque fois qu'on submit on met dans une variable et ensuite on vide
    answerEl.value = "";

    const operation = getOperation(data.operator);

    const result = operation(data.num1, data.num2);
    console.log(answer);
    const isRight = answer === result;

    const feedback = isRight ? "So cool !!!!" : "Too bad... :(";
    resultEl.innerHTML = feedback;

    resultEl.classList.toggle("sucess", isRight);
    resultEl.classList.toggle("error", !isRight);
    //tu incrémentes et ensuite tu envoies dans le innerhtml
    ++score.questions;
    if (isRight) {
        goodAnswersEl.innerHTML = ++score.goodAnswers;
    }
});
getRandomNumbersByLevel();