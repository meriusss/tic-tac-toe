let playerFactory = (name,symbol) => {
    
    const playerName = name;

    const playerSymbol = symbol;

    return {playerName, playerSymbol}
};

let gameBoardFactory = () => {
    const gameBoard = ["E","E", "E",
                    "E","E", "E",
                    "E","E", "E",];

    
    const getGameBoard = () => {
        return gameBoard;
    };

    const updateGameBoard = (squareIndex, playerSymbol) => {
        gameBoard.splice(squareIndex, 1, playerSymbol);
    };

    return {getGameBoard, updateGameBoard};

}

let gameFactory = () => {

    const generateSquares = () => {

        const playArea = document.querySelector(".play-area");
        const squareGrid = document.createElement("div");
        squareGrid.classList.add("tic-tac-toe-grid");

        for (let i = 0; i < 9; i++){
            let square = document.createElement("div");
            let squareImage = document.createElement("img");
            square.classList.add("tic-tac-toe-square");
            square.append(squareImage);
            squareGrid.append(square);
        }
        playArea.append(squareGrid);
    };

    const updateSquares = (gameBoard) => {
        let squares = document.getElementsByClassName("tic-tac-toe-square");
        for (let i = 0; i < 9; i++){
            if (gameBoard.getGameBoard()[i] == "X"){
                squares[i].firstChild.src = "svgs/x.svg";
            }
            else if (gameBoard.getGameBoard()[i] == "O"){
                squares[i].firstChild.src = "svgs/o.svg";
            }
        }
    };

    const alternatePlayer = (currentPlayer, playerOne, playerTwo) => {
        if (currentPlayer.playerSymbol == playerOne.playerSymbol){
            return playerTwo;
        }

        else if (currentPlayer.playerSymbol == playerTwo.playerSymbol){
            return playerOne;
        }
    };

    const checkForWin = (gameBoard,squares,player) => {

        for (let i = 0; i < 9; i++){
            if ((gameBoard.getGameBoard()[i] == player.playerSymbol && gameBoard.getGameBoard()[i+1] == player.playerSymbol && gameBoard.getGameBoard()[i+2] == player.playerSymbol) && (([3,12,21].includes(3*i+3)))){
                squares[i].style.backgroundColor = "#7CA183";
                squares[i+1].style.backgroundColor = "#7CA183";
                squares[i+2].style.backgroundColor = "#7CA183";
                return player;
                }
            else if ((gameBoard.getGameBoard()[i] == player.playerSymbol && gameBoard.getGameBoard()[i+3] == player.playerSymbol && gameBoard.getGameBoard()[i+6] == player.playerSymbol) && ([9,12,15].includes(3*i+9))){
                squares[i].style.backgroundColor = "#7CA183";
                squares[i+3].style.backgroundColor = "#7CA183";
                squares[i+6].style.backgroundColor = "#7CA183";
                return player;
                }
            else if (gameBoard.getGameBoard()[i] == player.playerSymbol && gameBoard.getGameBoard()[i+4] == player.playerSymbol && gameBoard.getGameBoard()[i+8] == player.playerSymbol){
                squares[i].style.backgroundColor = "#7CA183";
                squares[i+4].style.backgroundColor = "#7CA183";
                squares[i+8].style.backgroundColor = "#7CA183";
                return player;
                }
            else if ((gameBoard.getGameBoard()[i+2] == player.playerSymbol && gameBoard.getGameBoard()[i+4] == player.playerSymbol && gameBoard.getGameBoard()[i+6] == player.playerSymbol) && (3*i+12 == 12)){
                squares[i+2].style.backgroundColor = "#7CA183";
                squares[i+4].style.backgroundColor = "#7CA183";
                squares[i+6].style.backgroundColor = "#7CA183";
                return player;
                }
            }

    };

    const gameOver = (winner, squares) => {
        for (let i = 0; i < 9; i++){
            squares[i].replaceWith(squares[i].cloneNode(true));
        }

        let playArea = document.querySelector(".play-area");
        
        let winnerText = document.createElement("p");
        winnerText.textContent = winner.playerName + " won the round!";

        let squareGrid = document.querySelector(".tic-tac-toe-grid");
        
        let playButton = document.createElement("button");
        playButton.id = "play-button";
        playButton.textContent = "PLAY AGAIN?";
        playButton.style.marginTop = "10px"
        playButton.addEventListener('click', ()=>{
            winnerText.remove();
            squareGrid.remove();
            playButtonFunction(playButton);
        });

        if (winner == 1){
            winnerText.textContent = "It's a draw!";
        }

        playArea.insertBefore(winnerText,playArea.firstChild);
        playArea.append(playButton);

    }


    const play = (gameBoard,playerOne,playerTwo) => {
        let squares = document.getElementsByClassName("tic-tac-toe-square");
        let currentPlayer = playerOne;
        let winner = 0;

        for (let i = 0; i < 9; i++){
            squares[i].addEventListener('click', function clickSquares() {
                if (gameBoard.getGameBoard()[i] == "E" && (winner != playerOne && winner != playerTwo)){
                    gameBoard.updateGameBoard(i, currentPlayer.playerSymbol);
                    updateSquares(gameBoard);
                    winner = checkForWin(gameBoard,squares,currentPlayer);
                    currentPlayer = alternatePlayer(currentPlayer,playerOne,playerTwo);
                }
                if (winner == playerOne || winner == playerTwo){
                    gameOver(winner, squares);
                }
                if (winner == undefined && gameBoard.getGameBoard().includes("E") == false){
                    winner = 1;
                    gameOver(winner, squares);
                }
                
            })
        }
    };

    return {generateSquares, play};
}

function playButtonFunction (playButton) {
    playButton.remove();

    let playerOneName = document.getElementById("player-one-name");
    let playerTwoName = document.getElementById("player-two-name");
    let playerNamesContainer = document.querySelector(".player-names");
    let playerOne = playerFactory("Player one", "X");
    let playerTwo = playerFactory("Player two", "O");


    if (playerOneName.value != ""){
        playerOne = playerFactory(playerOneName.value, "X");
    };

    if (playerTwoName.value != ""){
        playerTwo = playerFactory(playerTwoName.value, "O");
    };

    

    playerNamesContainer.style.visibility = "hidden";
    playerNamesContainer.style.height = "0";
    playerNamesContainer.style.width = "0";
    gameBoard = gameBoardFactory();
    game = gameFactory();
    game.generateSquares();
    game.play(gameBoard,playerOne,playerTwo);
}

let playButton = document.getElementById("play-button");
playButton.addEventListener('click', ()=>{
    playButtonFunction(playButton);
})