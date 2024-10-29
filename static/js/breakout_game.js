const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let blockRowCount = 5; // Number of rows of blocks
let blockColumnCount = 9; // Number of columns of blocks
let blockWidth = (canvas.width / blockColumnCount) - 10; // Adjusted block width
let blockHeight = 20;
let blocks = [];
for (let c = 0; c < blockColumnCount; c++) {
    blocks[c] = [];
    for (let r = 0; r < blockRowCount; r++) {
        blocks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

let speed = 1;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.getElementById("resetButton").addEventListener("click", resetGame);
document.getElementById("speedSelect").addEventListener("change", function () {
    speed = parseInt(this.value);
});

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            let b = blocks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === blockRowCount * blockColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#00FF00"; // Bright green color for the ball
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#61dafb";
    ctx.fill();
    ctx.closePath();
}

function drawBlocks() {
    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            if (blocks[c][r].status === 1) {
                let blockX = c * (blockWidth + 10) + 5; // Space between blocks
                let blockY = r * (blockHeight + 10) + 30; // Space between rows
                blocks[c][r].x = blockX;
                blocks[c][r].y = blockY;
                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, blockHeight);
                ctx.fillStyle = "#61dafb";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: " + score, 8, 20);
}

function resetGame() {
    document.location.reload();
}


function collisionDetection() {
    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            let b = blocks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === blockRowCount * blockColumnCount) {
                        showModal("YOU WIN, CONGRATULATIONS!");
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlocks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            showModal("GAME OVER");
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7 * speed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7 * speed;
    }

    x += dx * speed;
    y += dy * speed;
    requestAnimationFrame(draw);
}

function showModal(message) {
    document.getElementById("modalMessage").innerText = message;
    document.getElementById("gameOverModal").style.display = "block";
}

function resetGame() {
    document.getElementById("gameOverModal").style.display = "none"; // Hide modal
    document.location.reload(); // Reloads the game
}

draw();
