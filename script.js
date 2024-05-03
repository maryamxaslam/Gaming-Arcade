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

