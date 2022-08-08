import { Player } from './factories/Player';
import { GameboardDiplay } from './display/GameboardDisplay'


const player = new Player('You');
const computer = new Player('Computer');

const playerDisplay = new GameboardDiplay('player', player.gameboard);
const computerDisplay = new GameboardDiplay('computer', computer.gameboard);

player.addShip(5, [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6]]);
player.addShip(4, [[9, 6], [9, 7], [9, 8], [9, 9]]);
player.addShip(3, [[4, 1], [5, 1], [6, 1]]);
player.addShip(3, [[7, 3], [7, 4], [7, 5]]);
player.addShip(2, [[3, 7], [4, 7]]);

computer.addShip(5, [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6]]);
computer.addShip(4, [[9, 6], [9, 7], [9, 8], [9, 9]]);
computer.addShip(3, [[4, 1], [5, 1], [6, 1]]);
computer.addShip(3, [[7, 3], [7, 4], [7, 5]]);
computer.addShip(2, [[3, 7], [4, 7]]);

function updateDisplay() {
    playerDisplay.display();
    computerDisplay.display();
}

updateDisplay();


