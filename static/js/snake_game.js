const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = { x: 1, y: 0 }; // Start moving right
let food = {};
let score = 0;
let gameActive = true;

// Initialize game
function resetGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: 1, y: 0 };
    score = 0;
    gameActive = true;
    updateScore();
    generateFood();
    gameLoop();
}

// Generate food at a random position
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

    // Ensure food does not spawn on the snake
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    }
}

// Draw the snake on the canvas
function drawSnake() {
    ctx.fillStyle = "#4CAF50"; // Snake color
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = "#FF5722"; // Food color
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Move the snake and check for collisions
function moveSnake() {
    if (!gameActive) return;

    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

    // Check for collisions with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
        return;
    }

    // Check for collision with itself
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head); // Add new head
        score++;
        updateScore();
        generateFood(); // Generate new food
    } else {
        // Move snake
        snake.pop(); // Remove the tail
        snake.unshift(head); // Add new head
    }
}

// Update the score display
function updateScore() {
    document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
}

// End the game
function endGame() {
    gameActive = false;
    document.getElementById("scoreDisplay").textContent = `Game Over! Final Score: ${score}`;
}

// Main game loop
function gameLoop() {
    if (gameActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();
    }
    setTimeout(gameLoop, 100); // Game speed
}

// Change direction based on user input
function changeDirection(event) {
    const keyPressed = event.key;
    if (keyPressed === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -1 }; // Move up
    } else if (keyPressed === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: 1 }; // Move down
    } else if (keyPressed === "ArrowLeft" && direction.x === 0) {
        direction = { x: -1, y: 0 }; // Move left
    } else if (keyPressed === "ArrowRight" && direction.x === 0) {
        direction = { x: 1, y: 0 }; // Move right
    }
}

// Event listener for keydown events
window.addEventListener("keydown", changeDirection);

// Start the game
resetGame();
