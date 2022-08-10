const gameBoard = (() => {
    let _board =[['1','2','3'], ['4','5','6'], ['7','8','9']];

        const getGameBoard = () =>{
            return _board;
        }    
})();
const playerFactory = (player,mark,turn) =>{
    return {player,mark,turn};
}
const player1 = playerFactory('Player 1','X', true);
const player2 = playerFactory('Player 2', 'O',false);

const displayController = (() => {

})();