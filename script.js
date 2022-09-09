// DOM variables
let yellowTurn = document.querySelector('.yellow-turn');
let blueTurn = document.querySelector('.blue-turn');
let player1 = document.querySelectorAll('.player1');
let player2 = document.querySelectorAll('.player2');
let player1count = document.getElementById('p1checkers');
let player2count = document.getElementById('p2checkers')


// Global variables
let endPosition = '';
let startPosition = '';
const lettersArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numArr = ['1', '2', '3', '4', '5', '6', '7', '8'];
let jumpPosition = '';

let currentPlayer = 'player1Pieces';
let p1checkers = 12;
let p2checkers = 12;
let multiJump = false;
let kingStr = '';




// Creating checkers (pieces) for each player with unique ids and classes, adding dragging attributes
function startGame() {
    let i = 0;
    multiJump = false;
    yellowTurn.style.visibility = 'visible';
    blueTurn.style.visibility = 'hidden';

    player1.forEach((tile) => {
        const player1Piece = document.createElement('div');
        player1Piece.id = `player1${i}`;
        player1Piece.className = 'player1Pieces'
        player1Piece.setAttribute("draggable", "true");
        player1Piece.setAttribute("ondragstart", 'dragStart(event)');
        tile.appendChild(player1Piece);
        i++;
    });
    i = 0;
    player2.forEach((tile) => {
        const player2Piece = document.createElement('div');
        player2Piece.id = `player2${i}`;
        player2Piece.className = 'player2Pieces';
        player2Piece.setAttribute("draggable", "true");
        player2Piece.setAttribute("ondragstart", 'dragStart(event)');
        tile.appendChild(player2Piece);
        i++;
    });
}

// Removing both players' checkers from the board / clearing the board

function resetGame() {
    const playerPieces = document.querySelectorAll('.player1Pieces,.player2Pieces');
    multiJump = false;
    playerPieces.forEach(piece => {
        piece.setAttribute('draggable', 'true');
        piece.remove();
        i = 0;
    });
    currentPlayer = 'player1Pieces';
    // p1checkers = 12;
    // p2checkers = 12;
    player1count.innerText = 12;
    player2count.innerText = 12;
    if (document.getElementById('winner') !== null) {
        document.getElementById('winner').innerText = '';
    }
    const brightnessClear = document.querySelectorAll('.dark');
    brightnessClear.forEach(tile => {
        tile.style.filter = "brightness(100%)";
    })
}


// Grabbing the start-place of the player's checker upon 'picking up' a piece. e.g. b3
function dragStart(event) {
    kingStr = '';
    event.dataTransfer.setData("text", event.target.id);
    startPosition = event.path[1].id;
    let playerSelection = event.srcElement.className;

    if (playerSelection.includes('king')) {
        kingStr = 'king';
    }
    availableMove(startPosition, kingStr);
}

// Grabbing the end-place of the player's checker upon 'dropping' e.g. a4
function drop(event) {
    let data = event.dataTransfer.getData("text");
    endPosition = event.path[0].id;

    if (document.getElementById(data).className === 'player1Pieces') {
        if (endPosition[1] === '8') {
            const kingPiece = document.getElementById(data);
            kingPiece.className += ' king';
        }
    }
    if (document.getElementById(data).className === 'player2Pieces') {
        if (endPosition[1] === '1') {
            const kingPiece = document.getElementById(data);
            kingPiece.className += ' king';
        }
    }

    if (endPosition === moveOption1 || endPosition === moveOption2 || endPosition === moveOption3 || endPosition === moveOption4) {
        event.target.appendChild(document.getElementById(data));
        if (jumpCheck(startPosition, endPosition)) {
            findAndRemove(startPosition, endPosition);
            multiJump = multiJumpAvailableMove(endPosition, kingStr);
            console.log(multiJump);
            if (multiJump) {
                turnToggle();
            }
        };

        const brightnessClear = document.querySelectorAll('.dark');
        brightnessClear.forEach(tile => {
            tile.style.filter = "brightness(100%)";
        });
        turnToggle();

    }
}

function availableMove(startPosition, kingStr) {
    moveOption1 = '';
    moveOption2 = '';
    moveOption3 = '';
    moveOption4 = '';
    let startChar = startPosition[0];

    let nextLetter = String.fromCharCode(startChar.charCodeAt(0) + 1);
    let prevLetter = String.fromCharCode(startChar.charCodeAt(0) - 1);
    let nextNum = parseInt(startPosition[1], 10) + 1;
    let prevNum = parseInt(startPosition[1], 10) - 1;

    if (currentPlayer === 'player1Pieces' || kingStr === 'king') {
        moveOption1 = nextLetter + nextNum;
        if (lettersArr.includes(moveOption1[0]) && numArr.includes(moveOption1[1])) {
            if (obstructionCheck(moveOption1)) {
                if (document.getElementById(moveOption1).lastChild.className === currentPlayer) {
                    moveOption1 = '';
                } else {
                    let nextLetter = String.fromCharCode(moveOption1.charCodeAt(0) + 1);
                    let nextNum = parseInt(moveOption1[1], 10) + 1;
                    moveOption1 = nextLetter + nextNum;
                    if (lettersArr.includes(moveOption1[0]) && numArr.includes(moveOption1[1])) {
                        if (obstructionCheck(moveOption1)) {
                            moveOption1 = '';
                        }
                    }
                }
            }
        } else {
            moveOption1 = '';
        }
    }

    if (currentPlayer === 'player1Pieces' || kingStr === 'king') {
        moveOption2 = prevLetter + nextNum;
        if (lettersArr.includes(moveOption2[0]) && numArr.includes(moveOption2[1])) {
            if (obstructionCheck(moveOption2)) {
                if (document.getElementById(moveOption2).lastChild.className === currentPlayer) {
                    moveOption2 = '';
                } else {
                    let prevLetter = String.fromCharCode(moveOption2.charCodeAt(0) - 1);
                    let nextNum = parseInt(moveOption2[1], 10) + 1;
                    moveOption2 = prevLetter + nextNum;
                    if (lettersArr.includes(moveOption2[0]) && numArr.includes(moveOption2[1])) {
                        if (obstructionCheck(moveOption2)) {
                            moveOption2 = '';
                        }
                    }
                }
            }
        } else {
            moveOption2 = '';
        }
    }

    if (currentPlayer === 'player2Pieces' || kingStr === 'king') {
        moveOption3 = nextLetter + prevNum;
        if (lettersArr.includes(moveOption3[0]) && numArr.includes(moveOption3[1])) {
            if (obstructionCheck(moveOption3)) {
                if (document.getElementById(moveOption3).lastChild.className === currentPlayer) {
                    moveOption3 = '';
                } else {
                    let nextLetter = String.fromCharCode(moveOption3.charCodeAt(0) + 1);
                    let prevNum = parseInt(moveOption3[1], 10) - 1;
                    moveOption3 = nextLetter + prevNum;
                    if (lettersArr.includes(moveOption3[0]) && numArr.includes(moveOption3[1])) {
                        if (obstructionCheck(moveOption3)) {
                            moveOption3 = '';
                        }
                    }
                }
            }
        } else {
            moveOption3 = '';
        }
    }

    if (currentPlayer === 'player2Pieces' || kingStr === 'king') {
        moveOption4 = prevLetter + prevNum;
        if (lettersArr.includes(moveOption4[0]) && numArr.includes(moveOption4[1])) {
            if (obstructionCheck(moveOption4)) {
                if (document.getElementById(moveOption4).lastChild.className === currentPlayer) {
                    moveOption4 = '';
                } else {
                    let prevLetter = String.fromCharCode(moveOption4.charCodeAt(0) - 1);
                    let prevNum = parseInt(moveOption4[1], 10) - 1;
                    moveOption4 = prevLetter + prevNum;
                    if (lettersArr.includes(moveOption4[0]) && numArr.includes(moveOption4[1])) {
                        if (obstructionCheck(moveOption4)) {
                            moveOption4 = '';
                        }
                    }
                }
            }
        } else {
            moveOption4 = '';
        }
    }

    if (lettersArr.includes(moveOption1[0])) {
        document.getElementById(moveOption1).style.filter = "brightness(400%)";
    }
    if (lettersArr.includes(moveOption2[0])) {
        document.getElementById(moveOption2).style.filter = "brightness(400%)";
    }
    if (lettersArr.includes(moveOption3[0])) {
        document.getElementById(moveOption3).style.filter = "brightness(400%)";
    }
    if (lettersArr.includes(moveOption4[0])) {
        document.getElementById(moveOption4).style.filter = "brightness(400%)";
    }

}