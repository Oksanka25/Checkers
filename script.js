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
let moveOption1 = '';
let moveOption2 = '';
let moveOption3 = '';
let moveOption4 = '';
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
    yellowTurn.style.visibility = 'visible';
    blueTurn.style.visibility = 'visible';
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

// ondragover is a built in method that executes JavaScript when element is being dragged over a drop target. Setting preventDefault, to avoid unintended actions
function onDragOver(event) {
    event.preventDefault();
}

// Grabbing the end-place of the player's checker upon 'dropping' e.g. a4
function drop(event) {
    event.preventDefault();
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

//Checks to see if a move was 1 diagonal length, or 2. The latter yielding a jump condition
//the Math.abs() function returns the absolute value of a number.
function jumpCheck(startPosition, endPosition) {
    let difference = Math.abs(endPosition[1] - startPosition[1]);
    if (difference > 1) {
        return true;
    } else {
        return false;
    }
}

// Finds the tile between starting/ending position, then removes child if it exists.
function findAndRemove(startPosition, endPosition) {
    jumpPosition = "";
    let startCharIndex = lettersArr.indexOf(startPosition[0]);
    let endCharIndex = lettersArr.indexOf(endPosition[0]);
    let whichPlayerToReduce = '';
    // up-right 
    if (endCharIndex > startCharIndex && endPosition[1] > startPosition[1]) {
        jumpPosition += lettersArr[endCharIndex - 1];
        jumpPosition += (endPosition[1] - 1);
        let unknownPiece = document.getElementById(`${jumpPosition}`);

        if (unknownPiece.lastChild.className === 'player1Pieces') {
            p1checkers--;
        } else {
            p2checkers--;
        }
        if (unknownPiece.lastElementChild !== null) {
            unknownPiece.removeChild(unknownPiece.lastElementChild);
        }
        // down-right 
    } else if (endCharIndex > startCharIndex && endPosition[1] < startPosition[1]) {
        jumpPosition += lettersArr[endCharIndex - 1];
        jumpPosition += (parseInt(endPosition[1], 10) + 1);
        let unknownPiece = document.getElementById(`${jumpPosition}`);
        if (unknownPiece.lastChild.className === 'player1Pieces') {
            p1checkers--;
        } else {
            p2checkers--;
        }
        if (unknownPiece.lastElementChild !== null) {
            unknownPiece.removeChild(unknownPiece.lastElementChild);
        }
        // up-left 
    } else if (endCharIndex < startCharIndex && endPosition[1] > startPosition[1]) {
        jumpPosition += lettersArr[endCharIndex + 1];
        jumpPosition += (endPosition[1] - 1);
        let unknownPiece = document.getElementById(`${jumpPosition}`);
        if (unknownPiece.lastChild.className === 'player1Pieces') {
            p1checkers--;
        } else {
            p2checkers--;
        }
        if (unknownPiece.lastElementChild !== null) {
            unknownPiece.removeChild(unknownPiece.lastElementChild);
        }
        // down-left 
    } else if (endCharIndex < startCharIndex && endPosition[1] < startPosition[1]) {
        jumpPosition += lettersArr[endCharIndex + 1];
        jumpPosition += (parseInt(endPosition[1], 10) + 1);
        let unknownPiece = document.getElementById(`${jumpPosition}`);
        if (unknownPiece.lastChild.className === 'player1Pieces') {
            p1checkers--;
        } else {
            p2checkers--;
        }
        if (unknownPiece.lastElementChild !== null) {
            unknownPiece.removeChild(unknownPiece.lastElementChild);
        }
    }
    document.getElementById('p1checkers').innerText = p1checkers;
    document.getElementById('p2checkers').innerText = p2checkers;
    if (p1checkers === 0) {
        const newPrgrph = document.createElement('p');
        newPrgrph.id = 'winner';
        const textNode = document.createTextNode('Player 2 (Y) Wins!');
        newPrgrph.appendChild(textNode);
        document.body.appendChild(newPrgrph);
    } else if (p2checkers === 0) {
        const newPrgrph = document.createElement('p');
        newPrgrph.id = 'winner';
        const textNode = document.createTextNode('Player 1 (B) Wins!');
        newPrgrph.appendChild(textNode);
        document.body.appendChild(newPrgrph);
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

function obstructionCheck(moveOption) {
    let obstruction = document.getElementById(moveOption).lastChild;
    if (obstruction !== null) {
        return true;
    } else {
        return false;
    }
}

function turnToggle() {
    if (currentPlayer === 'player1Pieces') {
        currentPlayer = 'player2Pieces';
        const player1Pieces = document.querySelectorAll('.player1Pieces');
        player1Pieces.forEach((piece) => {
            piece.setAttribute('draggable', 'false');
        });
        const player2Pieces = document.querySelectorAll('.player2Pieces');
        player2Pieces.forEach((piece) => {
            piece.setAttribute('draggable', 'true');
        });

        yellowTurn.style.visibility = 'hidden';
        blueTurn.style.visibility = 'visible';

    } else if (currentPlayer === 'player2Pieces') {
        currentPlayer = 'player1Pieces';


        const player2Pieces = document.querySelectorAll('.player2Pieces');
        player2Pieces.forEach((piece) => {
            piece.setAttribute('draggable', 'false');
        });
        const player1Pieces = document.querySelectorAll('.player1Pieces');
        player1Pieces.forEach((piece) => {
            piece.setAttribute('draggable', 'true');
        });
        yellowTurn.style.visibility = 'visible';
        blueTurn.style.visibility = 'hidden';
    }
}

function multiJumpAvailableMove(startPosition, kingStr) {
    let multiMoveOption1 = '';
    let multiMoveOption2 = '';
    let multiMoveOption3 = '';
    let multiMoveOption4 = '';

    let startChar = startPosition[0];

    let nextLetter = String.fromCharCode(startChar.charCodeAt(0) + 1);
    let prevLetter = String.fromCharCode(startChar.charCodeAt(0) - 1);
    let nextNum = parseInt(startPosition[1], 10) + 1;
    let prevNum = parseInt(startPosition[1], 10) - 1;

    if (currentPlayer === 'player1Pieces' || kingStr === 'king') {
        multiMoveOption1 = nextLetter + nextNum;
        if (lettersArr.includes(multiMoveOption1[0]) && numArr.includes(multiMoveOption1[1])) {
            if (obstructionCheck(multiMoveOption1)) {
                if (document.getElementById(multiMoveOption1).lastChild.className === currentPlayer) {
                    multiMoveOption1 = '';
                } else {
                    let nextLetter = String.fromCharCode(multiMoveOption1.charCodeAt(0) + 1);
                    let nextNum = parseInt(multiMoveOption1[1], 10) + 1;
                    multiMoveOption1 = nextLetter + nextNum;
                    if (lettersArr.includes(multiMoveOption1[0]) && numArr.includes(multiMoveOption1[1])) {
                        if (obstructionCheck(multiMoveOption1)) {
                            multiMoveOption1 = '';
                        }
                    }
                }
            } else {
                multiMoveOption1 = '';
            }
        } else {
            multiMoveOption1 = '';
        }
    }

    if (currentPlayer === 'player1Pieces' || kingStr === 'king') {
        multiMoveOption2 = prevLetter + nextNum;
        if (lettersArr.includes(multiMoveOption2[0]) && numArr.includes(multiMoveOption2[1])) {
            if (obstructionCheck(multiMoveOption2)) {
                if (document.getElementById(multiMoveOption2).lastChild.className === currentPlayer) {
                    multiMoveOption2 = '';
                } else {
                    let prevLetter = String.fromCharCode(multiMoveOption2.charCodeAt(0) - 1);
                    let nextNum = parseInt(multiMoveOption2[1], 10) + 1;
                    multiMoveOption2 = prevLetter + nextNum;
                    if (lettersArr.includes(multiMoveOption2[0]) && numArr.includes(multiMoveOption2[1])) {
                        if (obstructionCheck(multiMoveOption2)) {
                            multiMoveOption2 = '';
                        }
                    }
                }
            } else {
                multiMoveOption2 = '';
            }
        } else {
            multiMoveOption2 = '';
        }
    }

    if (currentPlayer === 'player2Pieces' || kingStr === 'king') {
        multiMoveOption3 = nextLetter + prevNum;
        if (lettersArr.includes(multiMoveOption3[0]) && numArr.includes(multiMoveOption3[1])) {
            if (obstructionCheck(multiMoveOption3)) {
                if (document.getElementById(multiMoveOption3).lastChild.className === currentPlayer) {
                    multiMoveOption3 = '';
                } else {
                    let nextLetter = String.fromCharCode(multiMoveOption3.charCodeAt(0) + 1);
                    let prevNum = parseInt(multiMoveOption3[1], 10) - 1;
                    multiMoveOption3 = nextLetter + prevNum;
                    if (lettersArr.includes(multiMoveOption3[0]) && numArr.includes(multiMoveOption3[1])) {
                        if (obstructionCheck(multiMoveOption3)) {
                            multiMoveOption3 = '';
                        }
                    }
                }
            } else {
                multiMoveOption3 = '';
            }
        } else {
            multiMoveOption3 = '';
        }
    }

    if (currentPlayer === 'player2Pieces' || kingStr === 'king') {
        multiMoveOption4 = prevLetter + prevNum;
        if (lettersArr.includes(multiMoveOption4[0]) && numArr.includes(multiMoveOption4[1])) {
            if (obstructionCheck(multiMoveOption4)) {
                if (document.getElementById(multiMoveOption4).lastChild.className === currentPlayer) {
                    multiMoveOption4 = '';
                } else {
                    let prevLetter = String.fromCharCode(multiMoveOption4.charCodeAt(0) - 1);
                    let prevNum = parseInt(multiMoveOption4[1], 10) - 1;
                    multiMoveOption4 = prevLetter + prevNum;
                    if (lettersArr.includes(multiMoveOption4[0]) && numArr.includes(multiMoveOption4[1])) {
                        if (obstructionCheck(multiMoveOption4)) {
                            multiMoveOption4 = '';
                        }
                    }
                }
            } else {
                multiMoveOption4 = '';
            }
        } else {
            multiMoveOption4 = '';
        }
    }

    if (lettersArr.includes(multiMoveOption1[0])) {
        document.getElementById(multiMoveOption1).style.filter = "brightness(400%)";
    }
    if (lettersArr.includes(multiMoveOption2[0])) {
        document.getElementById(multiMoveOption2).style.filter = "brightness(400%)";
    }
    if (lettersArr.includes(multiMoveOption3[0])) {
        document.getElementById(multiMoveOption3).style.filter = "brightness(400%)";
    }
    if (lettersArr.includes(multiMoveOption4[0])) {
        document.getElementById(multiMoveOption4).style.filter = "brightness(400%)";
    }
    if (multiMoveOption1 !== '' || multiMoveOption2 !== '' || multiMoveOption3 !== '' || multiMoveOption4 !== '') {
        return true;
    } else {
        return false;
    }

}