
const question = document.getElementById("ques");
const input_element = document.getElementById("input");
const form_element = document.getElementById("form");
const score_element = document.getElementById("score");
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");

const ope = ['+', '-', '*', '/'];

const op = Math.floor(Math.random() * 4);
const operator = ope[op]

// ========================== generating random number ======================================

let num1, num2;

//  num1 is greater than or equal to num2 for division
if (operator === '/' || operator === '-') {
    num1 = Math.ceil(Math.random() * 10);
    num2 = Math.floor(Math.random() * num1) + 1; // Ensure num2 is less than num1 and not zero
} else {
    num1 = Math.ceil(Math.random() * 10);
    num2 = Math.ceil(Math.random() * 10);
}

// ========================== generating random question ======================================

question.innerText = ` ${num1} ${operator} ${num2} = ?`;

//================================= YOUR SCORE PART =========================

let score = JSON.parse(localStorage.getItem("score"));

if (!score) {
    score = 0;
}
score_element.innerText = `Your Score: ${score}`


// Answer-part
const correctAns = eval(num1 + operator + num2);

form_element.addEventListener("submit", (e) => {

    //    e.preventDefault();

    const userAnswer = +input_element.value;
    if (userAnswer === correctAns) {
        score++;
        updateLocalStorage();
        correctSound.play()
    } else {
        score--;
        updateLocalStorage();
        incorrectSound.play()

    }
});

function updateLocalStorage() {
    localStorage.setItem("score", JSON.stringify(score));
}



// ========================================= TIMER PART ================================================

const timerElement = document.getElementById("timer-value");
let timeLeft = 20; // Set the initial timer value in seconds

// Function to update the timer display
function updateTimer() {
    timerElement.textContent = timeLeft;
}

// Start the timer when the page loads
updateTimer();

// Interval to update the timer every second
const timerInterval = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
    } else {
        // Timer has reached zero, perform actions here (e.g., end the game)
        clearInterval(timerInterval); // Stop the timer interval
        alert("Time's up!"); // Display an alert or perform other actions
    }
}, 1000); // Update every 1000 milliseconds (1 second)



// Reset Score   

const resetButton = document.getElementById("reset-btn");

resetButton.addEventListener("click", () => {
    // Reset the score to zero
    score = 0;
    // Update the local storage with the new score
    updateLocalStorage();
    // Update the score display

    score_element.innerText = `Your Score: ${score}`;

});