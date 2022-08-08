import { Gameboard } from "../factories/Gameboard";

describe('Gameboard tests', () => {
    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('board generates correctly', () => {
        expect(gameboard.board.length).toBe(10);
        expect(gameboard.board[0].length).toBe(10);
    });

    test('place ship', () => {
        gameboard.placeShip(1, [[0, 0]]);

    });

    describe('Ship placement tests', () => {
        beforeEach(() => {
            gameboard.placeShip(3, [[0, 0], [0, 1], [0, 2]]);
        });

        test('valid placement', () => {
            expect(gameboard.validPlacement([[1, 1]])).toBe(true);
            expect(gameboard.validPlacement([[0, 0]])).toBe(false);
        });

        test('ship placed', () => {
            expect(gameboard.board[0][0].hasShip).toBe(true);
            expect(gameboard.board[0][1].hasShip).toBe(true);
            expect(gameboard.board[0][2].hasShip).toBe(true);
            expect(gameboard.board[0][3].hasShip).toBe(false);
        });

        test('ship placed on existing ship', () => {
            expect(gameboard.placeShip(3, [[0, 2], [0, 3], [0, 4]])).toBe(false);
        });
    });

    describe('Attacking tests', () => {
        beforeEach(() => {
            gameboard.receiveAttack(4, 2);
        })

        test('board registers hit', () => {
            expect(gameboard.board[4][2].boardHit).toBe(true);
        });

        test('board only registers one hit', () => {
            expect(gameboard.receiveAttack(4, 2)).toBe(false);
        });

        describe('Ship hit tests', () => {
            beforeEach(() => {
                gameboard.placeShip(2, [[0, 0], [0, 1]]);
                gameboard.receiveAttack(0, 0);
            });

            test('board registers ship hit', () => {
                expect(gameboard.board[0][0].ship.hits).toEqual([[0, 0]]);
            });

            test('board registers ship sink', () => {
                gameboard.receiveAttack(0, 1);
                expect(gameboard.board[0][0].ship.isSunk()).toBe(true);
            });

            test('some but not all ships sink', () => {
                gameboard.placeShip(1, [[5, 5]]);
                gameboard.receiveAttack(0, 1);
                expect(gameboard.allShipsSunk()).toBe(false);
            })

            test('all ships sunk', () => {
                gameboard.placeShip(1, [[5, 5]]);
                gameboard.receiveAttack(0, 1);
                gameboard.receiveAttack(5, 5);
                expect(gameboard.allShipsSunk()).toBe(true);
            })
        })
    });
});
