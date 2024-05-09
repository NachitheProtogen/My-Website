let pdiv = document.getElementById("puzzleDiv");
let qdiv = document.getElementById("questionDiv");

let questionsAndAnswers = [
    {
        question: "What region of Germany am I from?",
        answers: ["NRW", "Nordrhein-Westfalen", "north rhine westphalia", "north rhine-westphalia"]
    },
    {
        question: "What feture of this website was originally a school project?",
        answers: ["paint",]
    },
    {
        question: "What is my favorite hobby?",
        answers: ["Videogames", "Gaming", "games"]
    },
    {
      question: "What is my birthday?",
      answers: ["Feb 3",
      "February 3rd",
      "3rd February",
      "02-03",
      "03/02",
      "02/03",
      "03 02",
      "02 03",
      "3 Feb",
      "Feb. 3rd",
      "3rd Feb",
      "Feb 3rd",
      "3/2/24",
      "03-02",
      "3/2",
      "2/3",
      "Feb 3",
      "Feb-03",
      "3-Feb",
      "3-Feb",
      "3rd Feb",
      "2-3",]
    },
    {
      question: "Who is my Boyfriend?",
      answers: ["Snowie","Snowy","Snow snow"]
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