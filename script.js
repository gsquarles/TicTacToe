
const setBoard = (() => {
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const playerOne = document.getElementById('turn1');
const playerTwo =document.getElementById('turn2');
const winningMessageTextElement = document.querySelector(
'[data-winning-message-text]');
let circleTurn;
return {X_CLASS,CIRCLE_CLASS, WINNING_COMBINATIONS, cellElements,board,
winningMessageElement, restartButton,winningMessageTextElement,circleTurn, playerOne, playerTwo}
})();

startGame();

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    setBoard.cellElements.forEach(cell => {
        cell.classList.remove(setBoard.X_CLASS);
        cell.classList.remove(setBoard.CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass();
    setBoard.winningMessageElement.classList.remove('show');
}

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? setBoard.CIRCLE_CLASS : setBoard.X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurns();
        setBoardHoverClass();
    }
}



function endGame(draw){
    if (draw){
        setBoard.winningMessageTextElement.innerText = 'Draw!'
    } else{
        setBoard.winningMessageTextElement.innerText = `${circleTurn ? "O's": 
    "X's"} Wins!`;
    }
    setBoard.winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...setBoard.cellElements].every(cell => {
        return cell.classList.contains(setBoard.X_CLASS) ||
        cell.classList.contains(setBoard.CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
    if(!circleTurn){
        setBoard.playerTwo.classList.remove('markO');
        setBoard.playerOne.classList.add('markX');
    }
    else if(circleTurn){
        setBoard.playerOne.classList.remove('markX');
        setBoard.playerTwo.classList.add('markO');
    }
}
function setBoardHoverClass(){
    board.classList.remove(setBoard.X_CLASS);
    board.classList.remove(setBoard.CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(setBoard.CIRCLE_CLASS);
    }
    else{
        board.classList.add(setBoard.X_CLASS);
    }
}

function checkWin(currentClass) {
  return  setBoard.WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
        return setBoard.cellElements[index].classList.contains(currentClass);
    })
  })
}