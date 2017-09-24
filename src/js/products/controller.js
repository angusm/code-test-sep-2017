import ProductsService from './service/service';

class ProductGroup {
    constructor(products) {
        this.products_ = products;
    }

    getAllProducts() {
        return this.products_;
    }
}

class Controller {
    /** @ngInject */
    constructor($scope) {
        this.products_ = [];
        this.productGroups_ = null;
        this.ngScope_ = $scope;
    }

    $onInit() {
        ProductsService.getProducts({limit: 100}).then((result) => {
            this.products_ = this.products_.concat(result);
            this.productGroups_ = null;
            this.ngScope_.$digest();
        });
    }

    getProductGroups() {
        if (!this.productGroups_) {
            const products = [...this.products_];
            const productGroups = [];
            while (products.length) {
                productGroups.push(new ProductGroup(products.splice(0, 20)));
            }
            this.productGroups_ = productGroups;
        }
        return this.productGroups_;
    }
}

export default Controller;
