const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Paddle properties
const paddleWidth = 20;
const paddleHeight = 100;
let playerY = canvas.height / 2 - paddleHeight / 2;
let computerY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 10;

// Ball properties
const ballSize = 12;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Score
let playerScore = 0;
let computerScore = 0;
let gameActive = true;

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerY = canvas.height / 2 - paddleHeight / 2;
    computerY = canvas.height / 2 - paddleHeight / 2;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 4;
    ballSpeedY = 4;
    gameActive = true;
    updateScore();
    document.getElementById("messageDisplay").textContent = '';
    gameLoop();
}

// Draw paddles and ball
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight); // Player paddle
    ctx.fillRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight); // Computer paddle

    // Draw ball
    ctx.fillStyle = "#FF5722";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

// Update game state
function update() {
    if (!gameActive) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY; // Reverse ball direction
    }

    // Ball collision with player paddle
    if (ballX <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Reverse ball direction
        playerScore++; // Increment player score when ball hits the paddle
        updateScore(); // Update score display
    } 
    // Ball collision with computer paddle
    else if (ballX >= canvas.width - paddleWidth - ballSize && ballY >= computerY && ballY <= computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Reverse ball direction
    }

    // Ball out of bounds
    if (ballX < 0) {
        computerScore++;
        updateScore();
        displayMessage("Computer scores!"); 
        setTimeout(resetBall, 1000);
    } else if (ballX > canvas.width) {
        playerScore++;
        updateScore();
        displayMessage("You scored!"); 
        setTimeout(resetBall, 1000);
    }

    // Move computer paddle to follow ball
    if (ballY < computerY + paddleHeight / 2) {
        computerY -= paddleSpeed * 0.5; // Move up
    } else if (ballY > computerY + paddleHeight / 2) {
        computerY += paddleSpeed * 0.5; // Move down
    }

    // Prevent computer paddle from going out of bounds
    if (computerY < 0) computerY = 0;
    if (computerY > canvas.height - paddleHeight) computerY = canvas.height - paddleHeight;
}

// Reset ball position and speed
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Change direction
}

// Update score display
function updateScore() {
    document.getElementById("scoreDisplay").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}

// Update message display
function displayMessage(message) {
    document.getElementById("messageDisplay").textContent = message;
}

// Game loop
function gameLoop() {
    draw();
    update();
    if (gameActive) {
        requestAnimationFrame(gameLoop);
    }
}

// Control paddles
function movePaddle(event) {
    const keyPressed = event.key;
    if (keyPressed === "ArrowUp" && playerY > 0) { // Player moves up
        playerY -= paddleSpeed;
    } else if (keyPressed === "ArrowDown" && playerY < canvas.height - paddleHeight) { // Player moves down
        playerY += paddleSpeed;
    }
}

// Event listener for keydown events
window.addEventListener("keydown", movePaddle);

// Start the game
resetGame();
