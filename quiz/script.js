const questions = [
    { word: "kutya", choices: ["dog", "cat", "fish"], answer: "dog" },
    { word: "macska", choices: ["cat", "dog", "elephant"], answer: "cat" },
    { word: "ház", choices: ["house", "car", "tree"], answer: "house" },
    { word: "madár", choices: ["dog", "cat", "bird"], answer: "bird" },
    { word: "én", choices: ["she", "I", "you"], answer: "I" },
    { word: "könyv", choices: ["house", "book", "tree"], answer: "book" },
    { word: "szórakozás", choices: ["fun", "fairy", "bottle"], answer: "fun" },
    { word: "város", choices: ["room", "city", "house"], answer: "city" },
    { word: "élelmiszer", choices: ["drinks", "food", "supermarket"], answer: "food" },
    { word: "álom", choices: ["dream", "heaven", "distraction"], answer: "dream" },
    { word: "inni", choices: ["to drink", "to eat", "to forget"], answer: "to drink" },
    { word: "szépség", choices: ["monster", "rose", "beauty"], answer: "beauty" },
    { word: "pillangó", choices: ["caterpillar", "butterfly", "pills"], answer: "butterfly" },
    { word: "ivóvíz", choices: ["drinking water", "river", "champagne"], answer: "drinking water" },
    { word: "zene", choices: ["festival", "waltzer", "music"], answer: "music" }
];

let currentQuestion = 0;
let score = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById("question").textContent = "Quiz Complete!";
        document.getElementById("options").innerHTML = "";
        return;
    }

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");

    let word = questions[currentQuestion].word;
    questionEl.textContent = `What does "${word}" mean?`;

    optionsEl.innerHTML = "";

    const shuffledChoices = shuffleArray(questions[currentQuestion].choices.slice()); // Create a copy and shuffle

    shuffledChoices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.onclick = () => checkAnswer(choice);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(choice) {
    if (choice === questions[currentQuestion].answer) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("question").textContent = "Quiz Complete!";
        document.getElementById("options").innerHTML = "";
        console.log("Quiz completed, showing modal."); 
        showWellDoneModal();
    }
}

function showWellDoneModal() {
    const modal = document.getElementById("wellDoneModal");
    console.log("Modal element:", modal);
    const finalScoreDisplay = document.getElementById("finalScoreDisplay");
    finalScoreDisplay.textContent = `Your final score is: ${score} out of ${questions.length}.`;
    modal.style.display = "block";

    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

loadQuestion();