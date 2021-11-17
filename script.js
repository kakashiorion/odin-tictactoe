const gameboard = (() => {
    const p1Mark = "X";
    const p2Mark = "O";
    const blank = " ";
    let board = [blank, blank, blank, blank, blank, blank, blank, blank, blank];
    let selected = 1;

    const selectPosition = (pos) => { selected = pos; }
    const changeMark = (mark) => { board[selected - 1] = mark; }
    const resetGameBoard = () => { board = [blank, blank, blank, blank, blank, blank, blank, blank, blank]; }
    const getPositon = () => { return selected };
    const getBoard = () => { return board };

    return {
        p1Mark, p2Mark, blank,
        selectPosition, changeMark, resetGameBoard, getPositon, getBoard
    };
})();

const gameController = (() => {
    let currentPlayer = 1;

    const changePlayer = () => {
        if (currentPlayer == 2) {
            currentPlayer = 1;
        } else {
            currentPlayer = 2;
        }
    }
    const getCurrentPlayer = () => { return currentPlayer; };
    const resetPlayer = () => { currentPlayer = 1; }

    return {

        changePlayer, resetPlayer, getCurrentPlayer,
    }
})();

const player = (pName) => {
    let score = 0;
    const name = pName;
    const increaseScore = () => score++;
    const resetScore = () => score = 0;
    const getScore = () => { return score; }

    return {
        name, score,
        increaseScore, resetScore, getScore
    }
};

let player1 = player("Player1");
let player2 = player("Player2");

function playerMove(position) {
    gameboard.selectPosition(position);
    if (gameController.getCurrentPlayer() == 1) {
        gameboard.changeMark(gameboard.p1Mark);
    } else {
        gameboard.changeMark(gameboard.p2Mark);
    }
    updateDisplay();
    checkWin();
    gameController.changePlayer();
}

function resetGame() {
    player1.resetScore();
    player2.resetScore();
    gameboard.resetGameBoard();
    gameController.resetPlayer();
    updateDisplay();
}

function checkWin() {
    let b1 = document.getElementById("b1").innerHTML;
    let b2 = document.getElementById("b2").innerHTML;
    let b3 = document.getElementById("b3").innerHTML;
    let b4 = document.getElementById("b4").innerHTML;
    let b5 = document.getElementById("b5").innerHTML;
    let b6 = document.getElementById("b6").innerHTML;
    let b7 = document.getElementById("b7").innerHTML;
    let b8 = document.getElementById("b8").innerHTML;
    let b9 = document.getElementById("b9").innerHTML;

    //Winning condition
    if ((b1 != " " && b1 == b2 && b2 == b3) || (b4 != " " && b4 == b5 && b5 == b6) || (b7 != " " && b7 == b8 && b8 == b9) ||
        (b1 != " " && b1 == b4 && b4 == b7) || (b2 != " " && b2 == b5 && b5 == b8) || (b3 != " " && b3 == b6 && b6 == b9) ||
        (b1 != " " && b1 == b5 && b5 == b9) || (b3 != " " && b3 == b5 && b5 == b7)) {
        document.getElementById("resultText").innerHTML = "Player " + gameController.getCurrentPlayer() + " wins!";
        document.getElementById("next").style.display = "inline-block";
        if (gameController.getCurrentPlayer() == 1) {
            player1.increaseScore();
        }
        else {
            player2.increaseScore();
        }
    }
    //Draw condition
    else if (b1 != " " && b2 != " " && b3 != " " && b4 != " " && b5 != " " && b6 != " " && b7 != " " && b8 != " " && b9 != " ") {
        document.getElementById("resultText").innerHTML = "Its a draw!";
        document.getElementById("next").style.display = "inline-block";
    }
}

function updateDisplay() {
    document.getElementById("b1").innerHTML = gameboard.getBoard()[0];
    document.getElementById("b2").innerHTML = gameboard.getBoard()[1];
    document.getElementById("b3").innerHTML = gameboard.getBoard()[2];
    document.getElementById("b4").innerHTML = gameboard.getBoard()[3];
    document.getElementById("b5").innerHTML = gameboard.getBoard()[4];
    document.getElementById("b6").innerHTML = gameboard.getBoard()[5];
    document.getElementById("b7").innerHTML = gameboard.getBoard()[6];
    document.getElementById("b8").innerHTML = gameboard.getBoard()[7];
    document.getElementById("b9").innerHTML = gameboard.getBoard()[8];
    document.getElementById("p1ScoreText").innerHTML = player1.getScore();
    document.getElementById("p2ScoreText").innerHTML = player2.getScore();
}

let buttons = document.getElementsByClassName("gameButton");
Array.from(buttons).forEach((element) => {
    element.addEventListener("click",
        () => {
            if (gameboard.getBoard()[element.id[1] - 1] == " ") {
                element.style.color = "black";
                playerMove(Number(element.id[1]));
            }
        }

    );
    element.addEventListener("mouseover",
        () => {
            if (element.innerHTML == " ") {
                element.style.color = "grey";
                element.innerHTML = gameController.getCurrentPlayer() == 1 ? "X" : "O";
            }
        }
    );
    element.addEventListener("mouseout",
        () => {
            if (gameboard.getBoard()[element.id[1] - 1] == " ") {
                element.innerHTML = " ";
            }
        }
    );
});

document.getElementById("reset").addEventListener("click", () => {
    resetGame();
});

let nextButton = document.getElementById("next")
nextButton.addEventListener("click", () => {
    nextButton.style.display = "none";
    document.getElementById("resultText").innerHTML = "";
    gameboard.resetGameBoard();
    gameController.resetPlayer();
    updateDisplay();
});
