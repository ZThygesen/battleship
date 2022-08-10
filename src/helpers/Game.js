import { display } from "../display/Display";
import { generateShips } from "./GenerateShips";
import { Player } from "../factories/Player";

const computerBoard = document.querySelector('.play-computer-board');

export class Game {
    constructor() {
        display.setup();

        this.player = new Player('You');
        this.computer = new Player('Computer');
        this.playerDisplay = display.displayGameboard(this.player.gameboard, 'setup-player-board');
        this.computerDisplay = display.displayGameboard(this.computer.gameboard, 'play-computer-board');
        
        display.showGameboard(this.playerDisplay);
        display.hideGameboard(this.computerDisplay);

        generateShips.placeShips(this.computer.gameboard);
        generateShips.placeShips(this.player.gameboard);
    }

    shuffleBoard() {
        this.player.gameboard.resetBoard();
        generateShips.placeShips(this.player.gameboard);
        this.update();
    }

    playGame() {
        display.startGame();
        this.playerDisplay = display.displayGameboard(this.player.gameboard, 'play-player-board', this);
    
        display.showGameboard(this.playerDisplay);
        display.showGameboard(this.computerDisplay);

        this.update();
    }

    playerAttack(x, y) {
        if (!this.player.makeAttack(x, y, this.computer.gameboard)) {
            display.setGameStatus('You already attacked there!');
            return;
        }

        this.update();

        computerBoard.style.pointerEvents = 'none';
        
        if (this.checkIfSunk(this.computer)) {
            display.gameOver(this.player.name);
        }

        display.setGameStatus('Computer\'s turn!');
        setTimeout(() => this.computerAttack(), 1000);
    }

    computerAttack() {
        this.computer.makeRandomAttack(this.player.gameboard);

        this.update();

        if (this.checkIfSunk(this.player)) {
            display.gameOver(this.computer.name);
        }

        display.setGameStatus('Your turn!');
        computerBoard.style.pointerEvents = 'all';
    }

    checkIfSunk(player) {
        return player.isSunk();
    }

    update() {
        this.playerDisplay.display(this);
        this.computerDisplay.display(this);
    }
}
