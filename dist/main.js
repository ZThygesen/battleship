/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


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
/* 2 */
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
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


class Player {
    constructor(name) {
        this.name = name;
        this.ships = [];
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

    createShip(length, coords) {

    }
}


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
/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


const player = new _factories_Player__WEBPACK_IMPORTED_MODULE_0__.Player('You');
const computer = new _factories_Player__WEBPACK_IMPORTED_MODULE_0__.Player('Computer');

console.log(player);
console.log(computer);


})();

/******/ })()
;