/**
 * @fileoverview A group of products to display and the ad to display underneath
 * them.
 */

import Product from './service/product';

class ProductGroup {
    /**
     * @param {!Array<!Product>} products List of products.
     * @param {string} advertisement URL of an advertisement image.
     */
    constructor(products, advertisement) {
        /** @private {string} URL of an advertisement image. */
        this.advertisement_ = advertisement;

        /** @private {!Array<!Product>} List of products. */
        this.products_ = products;
    }

    /**
     * @returns {string} URL of an advertisement image.
     * @export
     */
    getAdvertisement() {
        return this.advertisement_;
    }

    /**
     * @returns {!Array<!Product>} List of products.
     * @export
     */
    getAllProducts() {
        return this.products_;
    }
}

export default ProductGroup;
