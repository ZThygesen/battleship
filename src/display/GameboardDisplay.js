const colors = ['#710c04', '#d21404', '#420c09', '#900603', '#bc544b'];

export class GameboardDisplay {
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


