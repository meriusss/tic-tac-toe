// const test = () => {
//     let name;

//     const setName = (input) => {
//         name = input;
//     }

//     const getName = () => {
//         return name;
//     }

//     return  { setName, getName };
// };
let playArea = document.querySelector(".play-area");
let playButton = document.getElementById("play-button");

const gameBoardFactory = () => {

    //Declare gameboard
    //E means it's empty
    const gameBoard = ["E", "E", "E", 
                    "E", "E", "E", 
                    "E", "E", "E"];

    const changeGameBoard = (squareIndex, currentPlayerSymbol) => {
        gameBoard.splice(squareIndex, 1, currentPlayerSymbol);
    };

    const getGameBoard = () => {
        return gameBoard;
    };

    return {changeGameBoard, getGameBoard};   
};

const gameFactory = () => {

    const createGame = () => {
        let ticTacToeGrid = document.createElement("div");
        ticTacToeGrid.classList.add("tic-tac-toe-grid");
        
        for(let i = 0; i < 9; i++){
            let ticTacToeSquare = document.createElement("div");
            let ticTacToeImage = document.createElement("img");
            ticTacToeSquare.classList.add("tic-tac-toe-square");
            ticTacToeSquare.append(ticTacToeImage);
            ticTacToeGrid.append(ticTacToeSquare);
        }

        playArea.append(ticTacToeGrid);

    };

    const updateGame = (gameboard) => {
        let gameSquares = document.getElementsByClassName("tic-tac-toe-square");
        for(let i = 0; i < gameSquares.length; i++){
            if (gameboard.getGameBoard()[i] == "X"){
                gameSquares[i].firstChild.src = "svgs/x.svg";
            }
            else if (gameboard.getGameBoard()[i] == "O"){
                gameSquares[i].firstChild.src = "svgs/o.svg";
            }
        }
    };


    const handlePlayerInputs = (game, gameBoard) => {
        let gameSquares = document.getElementsByClassName("tic-tac-toe-square");
        let currentPlayerSymbol = "X"
        for(let i = 0; i < gameSquares.length; i++){
            gameSquares[i].addEventListener('click', function listener (){
                if(gameBoard.getGameBoard()[i] == "E"){
                    let isWon = checkForWinner(gameBoard,gameSquares);
                    if (isWon != 1 && isWon != 2){
                        gameBoard.changeGameBoard(i,currentPlayerSymbol);
                        currentPlayerSymbol = alternatePlayer(currentPlayerSymbol);
                        checkForWinner(gameBoard,gameSquares);
                        game.updateGame(gameBoard);
                    }

            }
            })
        }
    }
    
    const alternatePlayer = (currentPlayerSymbol) => {
        if (currentPlayerSymbol == "X") {
            return "O";
        }
        else if (currentPlayerSymbol == "O"){
            return "X";
        }
    }

    const checkForWinner = (gameboard,squares) => {
        for(let i = 0; i < 9; i++){
            if ((gameboard.getGameBoard()[i] == "X" && gameboard.getGameBoard()[i+1] == "X" && gameboard.getGameBoard()[i+2] == "X") && (([3,12,21].includes(3*i+3)))){
                console.log("X wins");
                squares[i].style.backgroundColor = "#7CA183";
                squares[i+1].style.backgroundColor = "#7CA183";
                squares[i+2].style.backgroundColor = "#7CA183";
                return 1;
            }
            else if ((gameboard.getGameBoard()[i] == "O" && gameboard.getGameBoard()[i+1] == "O" && gameboard.getGameBoard()[i+2] == "O") && (([3,12,21].includes(3*i+3)))){
                console.log("O wins");
                squares[i].style.backgroundColor = "#7CA183";
                squares[i+1].style.backgroundColor = "#7CA183";
                squares[i+2].style.backgroundColor = "#7CA183";
                return 2;
            }

            else if ((gameboard.getGameBoard()[i] == "X" && gameboard.getGameBoard()[i+3] == "X" && gameboard.getGameBoard()[i+6] == "X") && (([9,12,15].includes(3*i+9)))){
                console.log("X wins");
                squares[i].style.backgroundColor = "#7CA183";
                squares[i+3].style.backgroundColor = "#7CA183";
                squares[i+6].style.backgroundColor = "#7CA183";
                return 1;
            }

            else if ((gameboard.getGameBoard()[i] == "O" && gameboard.getGameBoard()[i+3] == "O" && gameboard.getGameBoard()[i+6] == "O") && (([9,12,15].includes(3*i+9)))){
                console.log("O wins");
                squares[i].style.backgroundColor = "#7CA183";
                squares[i+3].style.backgroundColor = "#7CA183";
                squares[i+6].style.backgroundColor = "#7CA183";
                return 2;
            }

            else if (gameboard.getGameBoard()[0] == "X" && gameboard.getGameBoard()[4] == "X" && gameboard.getGameBoard()[8] == "X") {
                console.log("X wins");
                squares[0].style.backgroundColor = "#7CA183";
                squares[4].style.backgroundColor = "#7CA183";
                squares[8].style.backgroundColor = "#7CA183";
                return 1;
            }

            else if (gameboard.getGameBoard()[0] == "O" && gameboard.getGameBoard()[4] == "O" && gameboard.getGameBoard()[8] == "O") {
                console.log("O wins");
                squares[0].style.backgroundColor = "#7CA183";
                squares[4].style.backgroundColor = "#7CA183";
                squares[8].style.backgroundColor = "#7CA183";
                return 2;
            }

            

            else if (gameboard.getGameBoard()[2] == "X" && gameboard.getGameBoard()[4] == "X" && gameboard.getGameBoard()[6] == "X") {
                console.log("X wins");
                squares[2].style.backgroundColor = "#7CA183";
                squares[4].style.backgroundColor = "#7CA183";
                squares[6].style.backgroundColor = "#7CA183";
                return 1;
            }

            else if (gameboard.getGameBoard()[2] == "O" && gameboard.getGameBoard()[4] == "O" && gameboard.getGameBoard()[6] == "O") {
                console.log("O wins");
                squares[2].style.backgroundColor = "#7CA183";
                squares[4].style.backgroundColor = "#7CA183";
                squares[6].style.backgroundColor = "#7CA183";
                return 2;
            }
            
            
        }
    }


    return {createGame, updateGame, handlePlayerInputs};
};


playButton.addEventListener('click', (e)=> {
    playButton.remove();
    let game = gameFactory();
    let gameboard = gameBoardFactory();
    game.createGame();
    game.handlePlayerInputs(game,gameboard);
});