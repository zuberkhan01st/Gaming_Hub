let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Player is always "X", computer is "O"
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function checkDraw() {
    return board.every(cell => cell !== "");
}

function updateStatus(message) {
    document.getElementById("game-status").textContent = message;
}

function makeMove(index) {
    if (gameActive && board[index] === "") {
        board[index] = currentPlayer;
        document.getElementById(`cell-${index}`).textContent = currentPlayer;
        
        if (checkWin(currentPlayer)) {
            updateStatus("You Win!");
            gameActive = false;
            return;
        }
        
        if (checkDraw()) {
            updateStatus("It's a Draw!");
            gameActive = false;
            return;
        }
        
        currentPlayer = "O"; // Switch to computer
        updateStatus("Computer's Turn");
        setTimeout(computerMove, 500); // Delay for realism
    }
}

function computerMove() {
    let emptyCells = board.map((value, index) => value === "" ? index : null).filter(val => val !== null);
    
    if (emptyCells.length === 0) return;
    
    let index = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // Random computer move
    board[index] = "O";
    document.getElementById(`cell-${index}`).textContent = "O";
    
    if (checkWin("O")) {
        updateStatus("Computer Wins!");
        gameActive = false;
        return;
    }
    
    if (checkDraw()) {
        updateStatus("It's a Draw!");
        gameActive = false;
        return;
    }
    
    currentPlayer = "X"; // Switch back to player
    updateStatus("Your Turn");
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    updateStatus("Your Turn");
}
