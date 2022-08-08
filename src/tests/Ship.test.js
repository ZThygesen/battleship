import { Ship } from "../Ship";

describe('Ship tests', () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(3, [1, 2, 3]);
    });

    test('creates ship with correct length', () => {
        expect(ship.length).toBe(3);
    });

    test('ship gets hit successfully', () => {
        ship.hit(2);
        expect(ship.hits).toEqual([2]);
    });

    test('multiple hits', () => {
        ship.hit(1);
        ship.hit(2);
        expect(ship.hits).toEqual([1, 2])
    });

    test('ship not sunk', () => {
        ship.hit(2);
        ship.hit(3);
        expect(ship.isSunk()).toBe(false);
    });

    test('ship sinks', () => {
        ship.hit(1);
        ship.hit(2);
        ship.hit(3);
        expect(ship.isSunk()).toBe(true);
    });

    test('multiple hits on same location', () => {
        ship.hit(1);
        ship.hit(1);
        expect(ship.hits.length).toBe(1);
    });
});
