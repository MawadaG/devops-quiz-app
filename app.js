let questions = [];

let filteredQuestions = [];
let currentQuestionIndex = 0;

fetch("data/questions.json")
  .then((response) => {
    if (!response.ok) throw new Error("Could not load questions.json");
    return response.json();
  })
  .then((data) => {
    questions = data;
    loadTopics();
  })
  .catch((error) => {
    console.error("Error loading questions:", error);

    document.getElementById("questionText").textContent =
      "Error loading questions. Make sure you're running with Live Server and data/questions.json exists.";
  });

function loadTopics() {
  const topicSelect = document.getElementById("topicSelect");
  const topics = [...new Set(questions.map((q) => q.topic))];

  topics.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });

  topicSelect.addEventListener("change", () => {
    const selectedTopic = topicSelect.value;

    clearFeedback();
    document.getElementById("optionsArea").innerHTML = "";

    if (!selectedTopic) {
      document.getElementById("questionText").textContent =
        "Question will appear here";
      return;
    }

    filteredQuestions = questions.filter((q) => q.topic === selectedTopic);
    currentQuestionIndex = 0;

    if (filteredQuestions.length === 0) {
      document.getElementById("questionText").textContent =
        "No questions found for this topic.";
      return;
    }

    showQuestion();
  });
}

function showQuestion() {
  clearFeedback();

  const questionText = document.getElementById("questionText");
  const optionsArea = document.getElementById("optionsArea");

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;

  optionsArea.innerHTML = "";

  currentQuestion.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.textContent = optionText;

    btn.addEventListener("click", () => checkAnswer(index));

    optionsArea.appendChild(btn);
  });
}

function checkAnswer(selectedIndex) {
  const feedbackText = document.getElementById("feedbackText");
  const explanationText = document.getElementById("explanationText");
  const optionsArea = document.getElementById("optionsArea");

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const buttons = optionsArea.querySelectorAll("button");
  buttons.forEach((b) => (b.disabled = true));

  if (selectedIndex === currentQuestion.answerIndex) {
    feedbackText.textContent = "Correct!";
  } else {
    feedbackText.textContent = "Wrong!";
  }

  explanationText.textContent = currentQuestion.explanation || "";

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex >= filteredQuestions.length) {
      document.getElementById("questionText").textContent =
        "Done! You finished this topic.";
      document.getElementById("optionsArea").innerHTML = "";
      clearFeedback();
      return;
    }

    showQuestion();
  }, 1000);
}

function clearFeedback() {
  document.getElementById("feedbackText").textContent = "";
  document.getElementById("explanationText").textContent = "";
}
