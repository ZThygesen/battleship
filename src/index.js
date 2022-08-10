import { Game } from './helpers/Game';

let game = new Game();

const shuffleBtn = document.querySelector('#shuffle');
shuffleBtn.addEventListener('click', () => game.shuffleBoard());

const startGameBtn = document.querySelector('#play');
startGameBtn.addEventListener('click', () => game.playGame());

game.update();

const playAgain = document.querySelector('#restart');
playAgain.addEventListener('click', () => {
    game = new Game();
    game.update();
})
