export class Ship {
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
