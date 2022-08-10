import { Gameboard } from "./Gameboard";

export class Player {
    constructor(name) {
        this.name = name;
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

    addShip(length, coords) {
        return this.gameboard.placeShip(length, coords);
    }

    isSunk() {
        return this.gameboard.allShipsSunk();
    }
}
