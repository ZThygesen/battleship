import { Ship } from "./Ship";

export class Gameboard {
    constructor() {
        this.board = this.generateCoords();
        this.boardHits = [];
        this.ships = [];
    }

    placeShip(length, coords) {
        const ship = new Ship(length);

        if (!this.validPlacement(coords)) {
            return false;
        }

        coords.forEach(coord => {
            const [x, y] = [coord[0], coord[1]];
            this.board[x][y].ship = ship;
            this.board[x][y].hasShip = true;
        });

        this.ships.push(ship);

        return true;
    }

    validPlacement(coords) {
        for (let i = 0; i < coords.length; i++) {
            const [x, y] = [coords[i][0], coords[i][1]];
            if (this.board[x][y].hasShip) {
                return false;
            }
        }

        return true;
    }

    receiveAttack(x, y) {
        if (this.isAlreadyHit(x, y)) { return false; }
        this.board[x][y].boardHit = true;

        if (this.shipHit(x, y)) { this.board[x][y].ship.hit([x, y]); }

        this.boardHits.push([x, y]);

        return true;
    }

    allShipsSunk() {
        for (let i = 0; i < this.ships.length; i++) {
            if (!this.ships[i].isSunk()) {
                return false;
            }
        }

        return true;
    }

    isAlreadyHit(x, y) {
        return this.board[x][y].boardHit;
    }

    shipHit(x, y) {
        return this.board[x][y].hasShip;
    }

    generateCoords() {
        const coords = [];
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                row.push({
                    ship: {},
                    hasShip: false,
                    boardHit: false,
                });
            }
            coords.push(row);
        }

        return coords;
    }
}
