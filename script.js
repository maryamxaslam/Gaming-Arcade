document.addEventListener('DOMContentLoaded', function() {
    function typeText(elementId, textToType) {
        const textElement = document.getElementById(elementId);
        const lines = textToType.split('<br>');
    lines.forEach((line) => {
        const lineElement = document.createElement('div');
            textElement.appendChild(lineElement);
         let currentIndex = 0;
       function typeLetter() {
                if (currentIndex < line.length) {
                    lineElement.textContent += line[currentIndex];
                    currentIndex++;
                    setTimeout(typeLetter, 100);
                }
            }
            typeLetter();
        });
    }

    typeText('typed-text1', 'ECS164 <br> Games');
    typeText('typed-text2', 'Challenge Your Mind -<br>Play Our Classic Puzzles');
    const gameLinks = document.querySelectorAll('.game-list a');
    gameLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const gameName = this.getAttribute('data-game');
            if (gameName === 'higherlower') {
                setupGame();
            }
        });
    });

    let currentNumber;

    function setupGame() {
        currentNumber = generateRandomNumber();
        const container = document.getElementById('game-container');
        if (container) {
            container.innerHTML = `
                <p>Current Number: <span id="current-number">${currentNumber}</span></p>
                <button onclick="guess('higher')">Higher</button>
                <button onclick="guess('lower')">Lower</button>
                <p id="game-message"></p>
            `;
            container.style.display = 'block'; 
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
        return Math.floor(Math.random() * 100) + 1;  
    }
});

