// DOM variables
let yellowTurn = document.querySelector('.yellowTurn');
let blueTurn = document.querySelector('.blueTurn');
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


// Grabbing the start place of the player's checker 'upon 'picking up' a piece. e.g. B3 or E4. 
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

