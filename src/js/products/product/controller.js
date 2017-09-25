import Product from '../service/product';

class Controller {
    constructor() {
        /** @export {?Product} Product displayed in the component. */
        this.product = null;
    }

    /**
     * @returns {?Product} Product displayed in the component.
     * @export
     */
    getProduct() {
        return this.product;
    }

}

export default Controller;
