/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _display_Display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _GenerateShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




const computerBoard = document.querySelector('.play-computer-board');

class Game {
    constructor() {
        _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.setup();

        this.player = new _factories_Player__WEBPACK_IMPORTED_MODULE_2__.Player('You');
        this.computer = new _factories_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Computer');
        this.playerDisplay = _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.displayGameboard(this.player.gameboard, 'setup-player-board');
        this.computerDisplay = _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.displayGameboard(this.computer.gameboard, 'play-computer-board');
        
        _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.showGameboard(this.playerDisplay);
        _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.hideGameboard(this.computerDisplay);

        _GenerateShips__WEBPACK_IMPORTED_MODULE_1__.generateShips.placeShips(this.computer.gameboard);
        _GenerateShips__WEBPACK_IMPORTED_MODULE_1__.generateShips.placeShips(this.player.gameboard);
    }

    shuffleBoard() {
        this.player.gameboard.resetBoard();
        _GenerateShips__WEBPACK_IMPORTED_MODULE_1__.generateShips.placeShips(this.player.gameboard);
        this.update();
    }

    playGame() {
        _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.startGame();
        this.playerDisplay = _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.displayGameboard(this.player.gameboard, 'play-player-board', this);
    
        _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.showGameboard(this.playerDisplay);
        _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.showGameboard(this.computerDisplay);

        this.update();
    }

    playerAttack(x, y) {
        if (!this.player.makeAttack(x, y, this.computer.gameboard)) {
            _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.setGameStatus('You already attacked there!');
            return;
        }

        this.update();

        computerBoard.style.pointerEvents = 'none';
        
        if (this.checkIfSunk(this.computer)) {
            _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.gameOver(this.player.name);
        }

        _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.setGameStatus('Computer\'s turn!');
        setTimeout(() => this.computerAttack(), 0);
    }

    computerAttack() {
        this.computer.makeRandomAttack(this.player.gameboard);

        this.update();

        if (this.checkIfSunk(this.player)) {
            _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.gameOver(this.computer.name);
        }

        _display_Display__WEBPACK_IMPORTED_MODULE_0__.display.setGameStatus('Your turn!');
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


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameboardDisplay": () => (/* binding */ GameboardDisplay)
/* harmony export */ });
const colors = ['#710c04', '#d21404', '#420c09', '#900603', '#bc544b'];

class GameboardDisplay {
    constructor(gameboard, cssClass) {
        this.gameboard = gameboard;
        this.cssClass = cssClass;
        this.domElem = document.querySelector(`.${this.cssClass}`);
    }

    display(game) {
        this.colorShips();

        this.domElem.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const square = document.createElement('div');
                square.className = `${i} ${j}`;
                if (/computer/.test(this.cssClass)) {
                    square.addEventListener('click', () => {
                        this.attack(square, game);
                    });

                    this.colorComputerSquare(square, this.gameboard.board[i][j]);
                } else {
                    this.colorPlayerSquare(square, this.gameboard.board[i][j]);
                }
    
                this.domElem.appendChild(square);
            }
        }
    }

    colorShips() {
        for (let i = 0; i < 5; i++) {
            this.gameboard.ships[i].setColor(colors[i]);
        }
    }

    colorComputerSquare(square, tile) {
        let color;
        if (tile.hasShip && tile.boardHit) {
            color = 'transparent';
            square.classList.add('hit');
        } else if (tile.boardHit) {
            color = 'transparent';
        } else {
            color = '#bec2cb';
        }
        
        square.style.backgroundColor = color;
    }

    colorPlayerSquare(square, tile) {
        let color;
        if (tile.hasShip && tile.boardHit) {
            color = 'transparent';
            square.classList.add('hit');
        } else if (tile.hasShip) {
            color = tile.ship.color;
        } else if (tile.boardHit) {
            color = 'transparent';
        } else {
            color = '#bec2cb';
        }
        
        square.style.backgroundColor = color;
    }

    attack(square, game) {
        const [x, y] = square.className.split(' ');
        game.playerAttack(x, y);
    }

    hide() {
        this.domElem.style.display = 'none';
    }

    show() {
        this.domElem.style.display = 'grid';
    }
}




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateShips": () => (/* binding */ generateShips)
/* harmony export */ });
const generateShips = (function () {
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




/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


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

    isSunk() {
        return this.gameboard.allShipsSunk();
    }
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


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

    resetBoard() {
        this.ships = [];
        this.board = this.generateCoords();
    }
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
    constructor(length) {
        this.length = length;
        this.hits = [];
        this.color;
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

    setColor(color) {
        this.color = color;
    }
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "display": () => (/* binding */ display)
/* harmony export */ });
/* harmony import */ var _GameboardDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


const display = (function () {
    const setupElem = document.querySelector('.setup');
    const playAreaElem = document.querySelector('.play-area');
    const gameOverElem = document.querySelector('.game-over');

    const gameStatus = document.querySelector('#game-status');

    const displayGameboard = (gameboard, cssClass) => {
        return new _GameboardDisplay__WEBPACK_IMPORTED_MODULE_0__.GameboardDisplay(gameboard, cssClass);
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
/* harmony import */ var _helpers_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


let game = new _helpers_Game__WEBPACK_IMPORTED_MODULE_0__.Game();

const shuffleBtn = document.querySelector('#shuffle');
shuffleBtn.addEventListener('click', () => game.shuffleBoard());

const startGameBtn = document.querySelector('#play');
startGameBtn.addEventListener('click', () => game.playGame());

game.update();

const playAgain = document.querySelector('#restart');
playAgain.addEventListener('click', () => {
    game = new _helpers_Game__WEBPACK_IMPORTED_MODULE_0__.Game();
    game.update();
})

})();

/******/ })()
;