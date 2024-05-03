console.log('higherlower.js loaded successfully');

let currentNumber;

function setupGame() {
    currentNumber = generateRandomNumber();
    const container = document.getElementById('game-container');
    if (container) {
        container.innerHTML = `
            <div class="game-display">
                <div class="card">
                    <p>Current Number: <span id="current-number" class="number">${currentNumber}</span></p>
                </div>
            </div>
            <div class="buttons">
                <button class="game-btn higher"><i class="fas fa-arrow-up"></i> Higher</button>
                <button class="game-btn lower"><i class="fas fa-arrow-down"></i> Lower</button>
            </div>
            <p id="game-message" class="message"></p>
        `;

        // Attach event listeners to buttons
        container.querySelector('.higher').addEventListener('click', function() {
            guess('higher');
        });
        container.querySelector('.lower').addEventListener('click', function() {
            guess('lower');
        });

        container.style.display = 'flex'; // Adjust display for layout
    } else {
        console.error("Game container not found.");
    }
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;  // Random number between 1 and 100
}

document.addEventListener('DOMContentLoaded', setupGame);

window.guess = function(direction) {
    const nextNumber = generateRandomNumber();
    const isHigher = nextNumber > currentNumber;
    const message = document.getElementById('game-message');
    if ((direction === 'higher' && isHigher) || (direction === 'lower' && !isHigher)) {
        message.textContent = `Correct! ${nextNumber} is ${direction} than ${currentNumber}.`;
        message.className = 'message correct'; // Add correct class for styling
    } else {
        message.textContent = `Wrong! ${nextNumber} is ${isHigher ? 'higher' : 'lower'} than ${currentNumber}.`;
        message.className = 'message wrong'; // Add wrong class for styling
    }
    document.getElementById('current-number').textContent = nextNumber;
    document.querySelector('.card').innerHTML = `<p>Current Number: <span class="number">${nextNumber}</span></p>`;
    currentNumber = nextNumber;
};
