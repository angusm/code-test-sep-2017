class ProductGroup {
    constructor(products, advertisement) {
        this.advertisement_ = advertisement;
        this.products_ = products;
    }

    /** @export */
    getAdvertisement() {
        return this.advertisement_;
    }

    /** @export */
    getAllProducts() {
        return this.products_;
    }
}
export default ProductGroup;