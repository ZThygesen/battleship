import { Gameboard } from "./Gameboard";

export class Player {
    constructor(name) {
        this.name = name;
        this.ships = [];
        this.gameboard = new Gameboard();
    }

    makeAttack(x, y, enemyGameboard) {
        return enemyGameboard.receiveAttack(x, y);
    }

    makeRandomAttack(enemyGameboard) {
        let xCoord = this.getRandomCoord();
        let yCoord = this.getRandomCoord();
        while (!enemyGameboard.receiveAttack(xCoord, yCoord)) {
            xCoord = this.getRandomCoord();
            yCoord = this.getRandomCoord();
        }

        return true;
    }

    getRandomCoord() {
        return Math.floor(Math.random() * 10);
    }

    createShip(length, coords) {

    }
}
