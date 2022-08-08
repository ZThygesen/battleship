import { GameboardDisplay } from "./display/GameboardDisplay";
import { generateComputerShips } from "./helpers/GenerateComputerShips";
import { Player } from "./factories/Player";

export class Game {
    constructor() {
        this.player = new Player('You');
        this.computer = new Player('Computer');
        this.playerDisplay = new GameboardDisplay('player', this.player.gameboard);
        this.computerDisplay = new GameboardDisplay('computer', this.computer.gameboard);
        
        generateComputerShips.placeShips(this.computer.gameboard);
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
