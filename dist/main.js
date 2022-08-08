/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
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

    isWinner() {
        return this.gameboard.allShipsSunk();
    }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class Gameboard {
    constructor() {
        this.board = this.generateCoords();
        this.boardHits = [];
        this.ships = [];
    }

    placeShip(length, coords) {
        const ship = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(length);

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


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
    constructor(length) {
        this.length = length;
        this.hits = [];
    }

    hit(location) {
        if (this.hits.includes(location)) {
            return;
        }

        this.hits.push(location);
    }

    isSunk() {
        return this.length === this.hits.length;
    }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameboardDisplay": () => (/* binding */ GameboardDisplay)
/* harmony export */ });
class GameboardDisplay {
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


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _display_GameboardDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _helpers_GenerateComputerShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




class Game {
    constructor() {
        this.player = new _factories_Player__WEBPACK_IMPORTED_MODULE_2__.Player('You');
        this.computer = new _factories_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Computer');
        this.playerDisplay = new _display_GameboardDisplay__WEBPACK_IMPORTED_MODULE_0__.GameboardDisplay('player', this.player.gameboard);
        this.computerDisplay = new _display_GameboardDisplay__WEBPACK_IMPORTED_MODULE_0__.GameboardDisplay('computer', this.computer.gameboard);
        
        _helpers_GenerateComputerShips__WEBPACK_IMPORTED_MODULE_1__.generateComputerShips.placeShips(this.computer.gameboard);
        this.generatePlayerShips();
    }

   /* generateComputerShips() {
        this.computer.addShip(5, [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6]]);
        this.computer.addShip(4, [[9, 6], [9, 7], [9, 8], [9, 9]]);
        this.computer.addShip(3, [[4, 1], [5, 1], [6, 1]]);
        this.computer.addShip(3, [[7, 3], [7, 4], [7, 5]]);
        this.computer.addShip(2, [[3, 7], [4, 7]]);
    }*/

    generatePlayerShips() {
        this.player.addShip(5, [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6]]);
        this.player.addShip(4, [[9, 6], [9, 7], [9, 8], [9, 9]]);
        this.player.addShip(3, [[4, 1], [5, 1], [6, 1]]);
        this.player.addShip(3, [[7, 3], [7, 4], [7, 5]]);
        this.player.addShip(2, [[3, 7], [4, 7]]);
    }

    update() {
        this.playerDisplay.display();
        this.computerDisplay.display();
    }
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateComputerShips": () => (/* binding */ generateComputerShips)
/* harmony export */ });
const generateComputerShips = (function () {
    const ships = [5, 4, 3, 3, 2];

    const placeShips = (gameboard) => {
        for (let i = 0; i < ships.length; i++) {
            let success = tryPlace(ships[i], gameboard);

            while (!success) {
                success = tryPlace(ships[i], gameboard);
            }
        }
    }

    const tryPlace = (shipLength, gameboard) => {
        const coords = generateShipCoords(shipLength);
        
        return gameboard.placeShip(shipLength, coords);
    }

    const generateShipCoords = (shipLength) => {
        const coords = [];
        const direction = getRandomDirection();
        const gridline = getRandomGridline();
        const startSquare = getRandomStartSquare(shipLength);

        // horizontal === 0; vertical === 1
        if (direction === 0) {
            for (let i = startSquare; i < startSquare + shipLength; i++) {
                coords.push([gridline, i]);
            }
        } else {
            for (let i = startSquare; i < startSquare + shipLength; i++) {
                coords.push([i, gridline]);
            }
        }

        return coords;
    }

    const getRandomDirection = () => {
        return Math.floor(Math.random() * 2);
    }

    const getRandomGridline = () => {
        return Math.floor(Math.random() * 10);
    }

    const getRandomStartSquare = (shipLength) => {
        return Math.floor(Math.random() * (10 - shipLength));
    }

    return { placeShips };
    
})();




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


const game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game();

game.update();



})();

/******/ })()
;