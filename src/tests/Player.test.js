import { Player } from '../factories/Player';

describe('Player tests', () => {
    let player;
    let computer;
    beforeEach(() => {
        player = new Player('You');
        computer = new Player('Computer');
    });

    test('make attack succeeds', () => {
        expect(player.makeAttack(0, 0, computer.gameboard)).toBe(true);
    });

    test('cannot make attack on same place twice', () => {
        player.makeAttack(0, 0, computer.gameboard);
        expect(player.makeAttack(0, 0, computer.gameboard)).toBe(false);
    });

    test('make same attack on other board works', () => {
        player.makeAttack(0, 0, computer.gameboard);
        expect(computer.makeAttack(0, 0, player.gameboard)).toBe(true);
    });

    test('make random attack succeeds', () => {
        expect(computer.makeRandomAttack(player.gameboard)).toBe(true);
    });
});
