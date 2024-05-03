
function loadAndStartGame(gameType) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';


    const script = document.createElement('script');
    script.src = `${gameType}.js`; 
    script.onload = () => {
        
        if (typeof startGame === 'function') {
            startGame(gameContainer); 
        }
    };
    document.body.appendChild(script);
}

let deck = [
    { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, 
    { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }
];


let currentCard;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function dealCard() {
    if (deck.length === 0) {
        alert('Out of cards!');
        return;
    }
    return deck.pop();
}

function displayCard(card) {
    const cardElement = document.getElementById('current-card');
    cardElement.src = `images/${card.value}.png`; 
}

function checkGuess(guess) {
    const nextCard = dealCard();
    if (!nextCard) return;

    const higher = nextCard.value > currentCard.value;
    const messageElement = document.getElementById('message');
    
    if ((guess === 'higher' && higher) || (guess === 'lower' && !higher)) {
        messageElement.textContent = 'Correct!';
    } else {
        messageElement.textContent = 'Incorrect!';
    }

    currentCard = nextCard;
    displayCard(currentCard);
}


document.addEventListener('DOMContentLoaded', function() {
    deck = shuffle(deck);
    currentCard = dealCard();
    displayCard(currentCard);

    const higherButton = document.getElementById('higher-btn');
    const lowerButton = document.getElementById('lower-btn');

    higherButton.addEventListener('click', function() {
        checkGuess('higher');
    });

    lowerButton.addEventListener('click', function() {
        checkGuess('lower');
    });
});
