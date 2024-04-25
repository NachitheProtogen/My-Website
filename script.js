let pdiv = document.getElementById("puzzleDiv");
let qdiv = document.getElementById("questionDiv");

let questionsAndAnswers = [
    {
        question: "Who is this website about?",
        answers: ["Nachi"]
    },
    {
        question: "What is my Character Nachi?",
        answers: ["Protogen", "a Protogen",]
    },
    {
        question: "What programming language is this website written in?",
        answers: ["JavaScript", "js"]
    },
    {
      question: "When did this website go into 1.0.0?",
      answers: ["Feb 1, 2024",
      "February 1, 2024",
      "1st February 2024",
      "2024-02-01",
      "01/02/2024",
      "02/01/2024",
      "01 02 2024",
      "02 01 2024",
      "1 Feb 2024",
      "2024年2月1日",
      "Feb. 1st, 2024",
      "1st Feb, 2024",
      "Feb 1st, 2024",
      "1/2/24",
      "02-01-24",
      "1/2/24",
      "2/1/24",
      "Feb 1 '24",
      "Feb-01-24",
      "1-Feb-24",
      "1-Feb-2024",
      "1st Feb '24",
      "2-1-24",]
    },
    {
      question: "What is my real name?",
      answers: ["Chris","Christian",]
    },
];

function createPuzzle() {
    questionsAndAnswers.forEach((item, index) => {
        let Question = document.createElement("p");
        Question.className = "text";
        Question.style.display = "inline-block";
        Question.innerHTML = item.question;
        
        let Keyword = document.createElement("input");
        Keyword.className = "keyword";
        Keyword.id = "Nr" + index;

        Keyword.addEventListener("input", () => {
            let inputField = document.getElementById("Nr" + index);
            let answerFound = item.answers.some(answer => inputField.value.toLowerCase() === answer.toLowerCase());
            if(answerFound){
                inputField.disabled = true;
                checkWinCondition();
            };
        });

        qdiv.appendChild(Question);
        qdiv.appendChild(Keyword);
        qdiv.appendChild(document.createElement("br"));
    });
};

function checkWinCondition() {
  let allQuestionsAnswered = questionsAndAnswers.every((item, index) => {
      let inputField = document.getElementById("Nr" + index);
      return item.answers.some(answer => inputField.value.toLowerCase() === answer.toLowerCase());
  });

  if (allQuestionsAnswered) {
      win();
  }
}

function win() {
    const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}

createPuzzle();