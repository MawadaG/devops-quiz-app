let questions = [];

// Load questions from JSON file
fetch("data/questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadTopics();
    })
    .catch(error => {
        console.error("Error loading questions:", error);
    });

// Load unique topics into dropdown
function loadTopics() {
    const topicSelect = document.getElementById("topicSelect");
    const topics = [...new Set(questions.map(q => q.topic))];

    topics.forEach(topic => {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}
function checkAnswer(selectedIndex) {
    const feedbackText = document.getElementById("feedbackText");
    const explanationText = document.getElementById("explanationText");

    const currentQuestion = filteredQuestions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answerIndex) {
        feedbackText.textContent = "Correct!";
    } else {
        feedbackText.textContent = "Wrong!";
    }

    explanationText.textContent = currentQuestion.explanation;
}
