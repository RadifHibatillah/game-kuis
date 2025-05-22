const questions = [
  {
    question: "Jangan salah fokus: Gunung tertinggi di dunia itu apa, bukan gunung gosip!",
    answers: [
      { text: "Gunung Everest—si raja ketinggian", correct: true },
      { text: "Gunung Lipstik—paling nge-trend", correct: false },
      { text: "Gunung Berapi—kalau meletus panik semua", correct: false },
      { text: "Gunung Judi—kalau kalah balik lagi", correct: false },
    ],
  },
  {
    question: "Bukan soal cinta, ini soal luas: Laut terluas di dunia apa? (Hint: Bukan laut drama!)",
    answers: [
      { text: "Samudra Pasifik—si raksasa air asin", correct: true },
      { text: "Laut Jakarta—kalau pas banjir jadi kolam raksasa", correct: false },
      { text: "Laut Tangis—kalau sedih jangan ke sana", correct: false },
      { text: "Laut Jomblo—mendalam sendirian terus", correct: false },
    ],
  },
  {
    question: "Gak perlu tes PCR: Universitas tertua di dunia berdiri di mana? (Bukan tentang ngetes cinta!)",
    answers: [
      { text: "Universitas Al-Qarawiyyin, Maroko—sejak abad ke-9", correct: true },
      { text: "Universitas Jomblo, Hati—selalu kosong", correct: false },
      { text: "Kampus Meja Bundar, Avalon—mitos belaka", correct: false },
      { text: "Universitas Instagram—kelasnya story semua", correct: false },
    ],
  },
  {
    question: "Bukan kurs rupiah, ini soal mata uang Jepang namanya apa? (Bukan Yokoso!)",
    answers: [
      { text: "Yen—si koin Jepang ikonik", correct: true },
      { text: "Yam—kalau tanaman sih iya", correct: false },
      { text: "Yes—kalau setuju bisa dipakai?", correct: false },
      { text: "Yen-yen—suara kasir waktu checkout", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;

// ambil semua element yang kita butuhkan dari "ID"
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

// buat fungsi untuk memulai quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  resultContainer.style.display = "none";
  questionContainer.style.display = "block";

  //function untuk menampilkan question
  showQuestion();
}

function showQuestion() {
  // untuk mereset state
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // buat button untuk jawaban secara dinamis
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    score++;
    selectedButton.style.backgroundColor = "#4caf50";
  } else {
    selectedButton.style.backgroundColor = "#f44336";
  }
  //disable all button after select answer
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct) {
      button.style.backgroundColor = "#4caf50";
    }
  });

  // tampilkan next button jika pertanyaan masih ada
  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = "inline-block";
  } else {
    showResult();
  }
}

// handle event listener nextbtn

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});

function showResult() {
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreElement.textContent = `Your score : ${score} / ${questions.length}`;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
