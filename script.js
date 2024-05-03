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
});


function loadGame(gameName) {
    const scriptId = 'game-script';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
        existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `${gameName}.js`; // Assuming gameName includes the '.js'
    script.defer = true;
    script.onload = function() {
        if (gameName === 'higherlower.js') {
            if (typeof window.setupGame === 'function') {
                window.setupGame();
            }
        }
    };
    script.onerror = function() {
        console.error(`Failed to load the script for ${gameName}. Please try again.`);
        alert(`Error loading ${gameName}. Please try again.`);
    };
    document.body.appendChild(script);
}