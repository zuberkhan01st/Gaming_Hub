const cardValues = ["🍎", "🍌", "🍇", "🍒", "🍉", "🍍", "🍓", "🍊"];
let cards = [...cardValues, ...cardValues];
let flippedCards = [];
let matchedCards = [];
let gameActive = true;

function shuffleCards() {
    cards = cards.sort(() => 0.5 - Math.random());
    renderBoard();
}

function renderBoard() {
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = '';
    cards.forEach((value, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.dataset.value = value;
        card.addEventListener("click", handleCardClick);
        gameBoard.appendChild(card);
    });
}

function handleCardClick(event) {
    if (!gameActive) return;

    const card = event.target;
    const index = card.dataset.index;

    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        card.textContent = card.dataset.value;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
        if (matchedCards.length === cards.length) {
            updateStatus("You Win!");
            gameActive = false;
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];
}

function updateStatus(message) {
    document.getElementById("game-status").textContent = message;
}

function resetGame() {
    gameActive = true;
    matchedCards = [];
    flippedCards = [];
    updateStatus("Good luck!");
    shuffleCards();
}

window.onload = shuffleCards;
