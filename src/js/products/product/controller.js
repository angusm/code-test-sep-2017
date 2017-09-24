class Controller {
    constructor() {
        /** @export */
        this.product = null;
    }

    getFace() {
        return this.getProduct().face;
    }

    getFaceStyle() {
        return {
            'font-size': `${this.getProduct().size}px`,
        };
    }

    getProduct() {
        return this.product;
    }
    getSize() {
        return this.getProduct().size;
    }

    getPrice() {
        return (this.getProduct().price / 100).toFixed(2);
    }

    getDate() {
        return this.getProduct().date;
    }

}

export default Controller;
