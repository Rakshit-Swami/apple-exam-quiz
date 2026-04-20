// app.js

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionCountInput = document.getElementById("question-count-input");
const startBtn = document.getElementById("start-btn");

const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score-text");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

const finalScore = document.getElementById("final-score");
const reviewBtn = document.getElementById("review-btn");
const restartBtn = document.getElementById("restart-btn");
const reviewContainer = document.getElementById("review-container");

let quizQuestions = [];
let currentIndex = 0;
let userAnswers = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

startBtn.addEventListener("click", () => {
  const totalAvailable = QUESTIONS.length;
  let desired = parseInt(questionCountInput.value, 10) || totalAvailable;
  desired = Math.max(1, Math.min(desired, totalAvailable));

  quizQuestions = [...QUESTIONS];
  shuffle(quizQuestions);
  quizQuestions = quizQuestions.slice(0, desired);

  userAnswers = Array(quizQuestions.length).fill(null);
  currentIndex = 0;

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  reviewContainer.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  renderQuestion();
  updateHeader();
});

function renderQuestion() {
  const q = quizQuestions[currentIndex];
  questionText.textContent = q.text;

  optionsList.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const li = document.createElement("li");
    li.className = "option-item";

    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = idx;

    if (userAnswers[currentIndex] === idx) {
      input.checked = true;
    }

    label.appendChild(input);
    label.append(` ${opt}`);
    li.appendChild(label);
    optionsList.appendChild(li);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === quizQuestions.length - 1;
}

function updateHeader() {
  progressText.textContent = `Question ${currentIndex + 1} of ${quizQuestions.length}`;
  const answeredCount = userAnswers.filter((a) => a !== null).length;
  scoreText.textContent = `Answered: ${answeredCount}/${quizQuestions.length}`;
}

function captureAnswer() {
  const selected = document.querySelector("input[name='option']:checked");
  if (selected) {
    userAnswers[currentIndex] = parseInt(selected.value, 10);
    updateHeader();
  }
}

prevBtn.addEventListener("click", () => {
  captureAnswer();
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
    updateHeader();
  }
});

nextBtn.addEventListener("click", () => {
  captureAnswer();
  if (currentIndex < quizQuestions.length - 1) {
    currentIndex++;
    renderQuestion();
    updateHeader();
  }
});

submitBtn.addEventListener("click", () => {
  captureAnswer();

  const unanswered = userAnswers.filter((a) => a === null).length;
  if (unanswered > 0 && !confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
    return;
  }

  const { score, total } = computeScore();
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScore.textContent = `You scored ${score} out of ${total} (${Math.round(
    (score / total) * 100
  )}%).`;
});

function computeScore() {
  let score = 0;
  quizQuestions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctIndex) {
      score++;
    }
  });
  return { score, total: quizQuestions.length };
}

reviewBtn.addEventListener("click", () => {
  reviewContainer.innerHTML = "";
  reviewContainer.classList.remove("hidden");

  quizQuestions.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    const correctChoice = q.correctIndex;

    const div = document.createElement("div");
    div.className = "review-item";

    const title = document.createElement("h3");
    title.textContent = `Q${idx + 1}: ${q.text}`;
    div.appendChild(title);

    const userP = document.createElement("p");
    userP.textContent =
      userChoice !== null
        ? `Your answer: ${q.options[userChoice]}`
        : "Your answer: (no answer)";
    if (userChoice === correctChoice) {
      userP.classList.add("correct");
    } else {
      userP.classList.add("incorrect");
    }
    div.appendChild(userP);

    const correctP = document.createElement("p");
    correctP.textContent = `Correct answer: ${q.options[correctChoice]}`;
    correctP.classList.add("correct");
    div.appendChild(correctP);

    if (q.explanation) {
      const exp = document.createElement("p");
      exp.className = "explanation";
      exp.textContent = `Explanation: ${q.explanation}`;
      div.appendChild(exp);
    }

    reviewContainer.appendChild(div);
  });
});

restartBtn.addEventListener("click", () => {
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
