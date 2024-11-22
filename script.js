const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const catchSound = document.getElementById("catch-sound");

let score = 0;
let time = 30;
let gameInterval;
let objectInterval;

// Player Movement
document.addEventListener("mousemove", (e) => {
    const playerX = Math.min(gameContainer.offsetWidth - player.offsetWidth, e.clientX);
    player.style.left = `${playerX}px`;
});

// Create Falling Objects
function createFallingObject() {
    const object = document.createElement("div");
    object.classList.add("falling-object");
    object.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;
    object.style.animationDuration = `${Math.random() * 3 + 2}s`;
    gameContainer.appendChild(object);

    object.addEventListener("animationend", () => {
        object.remove(); // Remove the object when it falls out of view
    });

    // Collision Detection
    const collisionCheck = setInterval(() => {
        const playerRect = player.getBoundingClientRect();
        const objectRect = object.getBoundingClientRect();

        if (
            playerRect.left < objectRect.right &&
            playerRect.right > objectRect.left &&
            playerRect.top < objectRect.bottom &&
            playerRect.bottom > objectRect.top
        ) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            catchSound.play();
            object.remove();
            clearInterval(collisionCheck);
        }
    }, 50);
}

// Start Timer
function startTimer() {
    const timer = setInterval(() => {
        time--;
        timerDisplay.textContent = `Time: ${time}`;

        if (time === 0) {
            clearInterval(timer);
            clearInterval(gameInterval);
            clearInterval(objectInterval);
            alert(`Game Over! Your Score: ${score}`);
        }
    }, 1000);
}

// Start the Game
function startGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = "Score: 0";
    timerDisplay.textContent = "Time: 30";

    gameInterval = setInterval(createFallingObject, 1000);
    startTimer();
}

startGame();
