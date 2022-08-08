export class GameboardDisplay {
    constructor(player, gameboard) {
        this.player = player;
        this.gameboard = gameboard;
        this.domElem = document.querySelector(`.${this.player}-board`)
    }

    display() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const square = document.createElement('div');
                square.style.backgroundColor = (this.gameboard.board[i][j].hasShip) ? 'black' : 'grey';
                this.domElem.appendChild(square);
            }
        }
    }
}
