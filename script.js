// DOM variables
let yellowTurn = document.querySelector('.yellowTurn');
let blueTurn = document.querySelector('.blueTurn');
let player1 = document.querySelectorAll('.player1');
let player2 = document.querySelectorAll('.player2');


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