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

export { generateShips };
