console.log('higherlower.js loaded successfully');

let currentNumber;

function setupGame() {
    currentNumber = generateRandomNumber();  // Ensure a number is generated when the game starts
    const container = document.getElementById('game-container');
    if (container) {
        container.innerHTML = `
            <p>Current Number: <span id="current-number">${currentNumber}</span></p>
            <button onclick="guess('higher')">Higher</button>
            <button onclick="guess('lower')">Lower</button>
            <p id="game-message"></p>
        `;
        container.style.display = 'block'; // Show the game area
    } else {
        console.error("Game container not found.");
    }
}

function guess(direction) {
    const nextNumber = generateRandomNumber();
    const isHigher = nextNumber > currentNumber;
    const message = document.getElementById('game-message');
    if ((direction === 'higher' && isHigher) || (direction === 'lower' && !isHigher)) {
        message.textContent = `Correct! ${nextNumber} is ${direction} than ${currentNumber}.`;
    } else {
        message.textContent = `Wrong! ${nextNumber} is ${isHigher ? 'higher' : 'lower'} than ${currentNumber}.`;
    }
    currentNumber = nextNumber;
    document.getElementById('current-number').textContent = currentNumber;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;  // Random number between 1 and 100
}

window.setupGame = setupGame;