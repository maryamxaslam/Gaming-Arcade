"use strict";
let selectedValue = 1;
let board = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0]];

let lockedNumbers = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]];

const premadeBoard_medium1 = [[0, 0, 1, 0, 0, 0, 0, 2, 6],
                              [0, 0, 0, 8, 1, 0, 7, 9, 0],
                              [0, 4, 0, 7, 0, 0, 0, 0, 0],
                              [1, 2, 4, 5, 0, 6, 3, 7, 0],
                              [0, 8, 0, 2, 0, 9, 0, 0, 0],
                              [7, 0, 9, 1, 0, 3, 8, 5, 2],
                              [0, 0, 0, 0, 2, 0, 6, 0, 0],
                              [6, 0, 7, 3, 0, 0, 0, 0, 0],
                              [4, 3, 0, 0, 0, 0, 0, 8, 7]];

let boardElements = [[],[],[],[],[],[],[],[],[]];

let difficulty = null;

let gameOverText = null;

( function() {
    window.addEventListener("load", init);

    function init() {
        for (let sec = 0; sec < 9; sec++) {
            let x = document.getElementById('sec-' + (sec + 1));
            let boxes = x.children;
            for (let box = 0; box < 9; box++) {
                let row = Math.floor(box / 3) + Math.floor(sec / 3) * 3;
                let col = box % 3 + sec % 3 * 3;
                boardElements[row][col] = boxes[box];
                boardElements[row][col].addEventListener("click", function() { setNumber(row, col)});
            }
        }

        difficulty = document.getElementsByName("difficulty");
        gameOverText = document.getElementById("game-over-text")
    }


} ) ();

function changeSelected(value) {
    selectedValue = value;
    
    console.log(value);
}

function setNumber(row, col) {
    if (lockedNumbers[row][col] === 0) {
        if (selectedValue === 0) {
            board[row][col] = selectedValue;
            boardElements[row][col].innerHTML = "";
        } else {
            board[row][col] = selectedValue;
            boardElements[row][col].innerHTML = selectedValue;

            if (isBoardFull()) {
                if (isBoardValid()) {
                    gameOverText.innerHTML = "PuzzleSolved!";
                }
                else {
                    gameOverText.innerHTML = "Something's not quite right.";
                }
            }
        }
    }
}

function generateBoard() {
    gameOverText.innerHTML = "";
    clearBoard();
    fillBoard(0,0);
    if (difficulty[0].checked) {
        removeValues(30);
    } else if (difficulty[1].checked) {
        removeValues(40);
    } else {
        removeValues(50);
    }
    setBoard();
}

function isBoardFull() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == 0)
                return false;
        }
    }

    return true;
}

function isBoardValid() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let currentNum = board[row][col];
            let secR = Math.floor(row / 3) * 3;
            let secC = Math.floor(col / 3) * 3;
            for (let i = 0; i < 9; i++) {
                if (board[row][i] == currentNum && i != col) {
                    return false;
                }

                if (board[i][col] == currentNum && i != row) {
                    return false;
                }

                if (board[secR + Math.floor(i / 3)][secC + i % 3] == currentNum && 
                    secR + Math.floor(i / 3) != row && secC + i % 3 != col) {
                    return false;
                }
            }
        }
    }

    return true;
}

function setBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if(board[row][col] != 0) {
                boardElements[row][col].innerHTML = board[row][col];
                boardElements[row][col].style.color = "teal";
                lockedNumbers[row][col] = 1;
            }
        }
    }
}

function clearBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            board[row][col] = 0;
            lockedNumbers[row][col] = 0;
            boardElements[row][col].style.color = "black";
            boardElements[row][col].innerHTML = "";
        }
    }
}

function fillBoard(row, col) {
    let numberList = [1,2,3,4,5,6,7,8,9];
    let numberOrder = shuffleList(numberList);

    if (row == 8 && col == 9) {
        return true;
    }

    if (col == 9) {
        col = 0;
        row++;
    }

    if (board[row][col] != 0) {
        fillBoard(row, col + 1);
    }

    for (let numberIndex = 0; numberIndex < 9; numberIndex++) {
        if (validMove(row, col, numberOrder[numberIndex])) {
            board[row][col] = numberOrder[numberIndex];
            if (fillBoard(row, col + 1)) {
                return true;
            }
            board[row][col] = 0;
        }
    }

    return false;
}

function removeValues(amount) {
    for (let i = 0; i < amount; i++) {
        let removed = false;
        while (removed === false) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);

            if (board[row][col] != 0) {
                board[row][col] = 0;
                removed = true;
            }
        }
    }
}

function shuffleList(list) {
    let index = list.length;

    while (index > 0) {
        let randomIndex = Math.floor(Math.random() * index);
        index--;

        [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
    }

    return list;
}

function validMove(row, col, number) {
    let secR = Math.floor(row / 3) * 3;
    let secC = Math.floor(col / 3) * 3;

    for(let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[secR + i][secC + j] == number)
                return false;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (board[row][i] == number)
            return false;

        if (board[i][col] == number)
            return false;
    }

    return true;
}

function setWithPremade(premade_board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if(premade_board[row][col] != 0) {
                board[row][col] = premade_board[row][col];
                boardElements[row][col].innerHTML = premade_board[row][col];
                boardElements[row][col].style.color = "blue";
                lockedNumbers[row][col] = 1;
            }
        }
    }
}
