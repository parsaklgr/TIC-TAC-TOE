const game = (() => {
    const gameBoard = (() => {
        const boardArray = [];
        for (let i = 0; i < 9; i++) {
            boardArray.push("");
        }

        const reset = () => {
            for (let i = 0; i < 9; i++) {
                boardArray[i] = "";
            }
        }

        const getBoard = () => {
            return boardArray;
        }
        
        const placeMark = (mark, index) => {
            getBoard()[index] = mark;
        }
        return { getBoard, reset, placeMark }
    })();

    const player = (mark) => {
        const mark_ = mark;
        const play = (div) => {
            gameBoard.placeMark(mark_, parseInt(div.index));
        }
        return { play, mark_ };
    };
    
    playerx = player("x");
    playero = player("o");
    let turn = playerx;

    const changeTurn = () => {
        if (turn == playerx) {
            turn = playero;
        } else {
            turn = playerx;
        }
    }

    const win = (mark) => {
        const congrat = document.querySelector("#congrajulation");
        congrat.textContent = `Congrajulation player${mark}! You won!`;
    }

    const checkWin = () => {
        const winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i of winCombinations) {
            let same = true;
            if (gameBoard.getBoard()[i[0]] === "") {
                same = false;
            }
            for (let j = 1; j < i.length; j++) {
                if (gameBoard.getBoard()[i[j]] !== gameBoard.getBoard()[i[0]]) {
                    same = false;
                    break;
                }
            }
            if (same === true) {
                win(turn.mark_);
            }
        }
    }

    const hit = (event) => {
        if (gameBoard.getBoard()[parseInt(event.target.index)] == "") {
            turn.play(event.target);
            render();
            checkWin();
            changeTurn();
        }
    };

    const resetBoard = () => {
        gameBoard.reset();
        const congrat = document.querySelector("#congrajulation");
        congrat.textContent = "";
        render();
    };

    const initiate = () => {
        const board = document.querySelector("#board");
        for (let i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.classList.toggle("board-div");
            div.index = i;
            div.addEventListener("click", hit);
            board.appendChild(div);
        }
        const restart = document.querySelector("button#restart");
        restart.addEventListener("click", resetBoard);
    };

    const render = () => {
        const boarddivs = [...document.querySelectorAll("#board>div")];
        for (let i = 0; i < 9; i++) {
            boarddivs[i].textContent = gameBoard.getBoard()[i];
        }
    };

    return {initiate, render};
})();


game.initiate();
game.render();