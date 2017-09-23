export default class Position2d {
    /**
     * Creates an X, Y coordinate
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    modulo(moduloValue) {
        return new Position2d(
            this.getX() % moduloValue,
            this.getY() % moduloValue
        );
    }

    /**
     * Scale the vector
     * @param factor
     * @returns {Position2d}
     */
    scale(factor) {
        return new Position2d(
            this.getX() * factor,
            this.getY() * factor
        );
    }

    translate(translation) {
        return new Position2d(
            this.getX() + translation.getX(),
            this.getY() + translation.getY()
        );
    }

    difference(subtrahend) {
        return this.translate(
            subtrahend.invert()
        );
    }

    /**
     * Invert the position
     * @returns {Position2d}
     */
    invert() {
        return new Position2d(
            -this.getX(),
            -this.getY()
        );
    }
}
