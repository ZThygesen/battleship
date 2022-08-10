import { GameboardDisplay } from "./GameboardDisplay";

const display = (function () {
    const setupElem = document.querySelector('.setup');
    const playAreaElem = document.querySelector('.play-area');
    const gameOverElem = document.querySelector('.game-over');

    const gameStatus = document.querySelector('#game-status');

    const displayGameboard = (gameboard, cssClass) => {
        return new GameboardDisplay(gameboard, cssClass);
    }

    const hideGameboard = (gameboard) => {
        gameboard.hide();
    }

    const showGameboard = (gameboard) => {
        gameboard.show();
    }

    const setup = () => {
        setupElem.style.display = 'flex';
        gameOverElem.style.display = 'none';
    }

    const startGame = () => {
        setupElem.style.display = 'none';
        playAreaElem.style.display = 'block';
    }

    const gameOver = (player) => {
        playAreaElem.style.display = 'none';
        gameOverElem.style.display = 'block';

        const message = document.querySelector('#winner');
        if (player === 'You') {
            message.textContent = 'You win!';
        } else {
            message.textContent = 'Computer wins!';
        }
    }

    const setGameStatus = (status) => {
        gameStatus.textContent = status;
    }

    return { displayGameboard, hideGameboard, showGameboard, setup, startGame, gameOver, setGameStatus };
})();

export { display };

