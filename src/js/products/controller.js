import LoadingService from './progress-indicator/service';
import ProductGroup from './product-group';
import ProductsService from './service/service';

const PRODUCTS_PER_REQUEST = 10;

class Controller {
    /** @ngInject */
    constructor($scope) {
        this.products_ = [];
        this.productGroups_ = null;
        this.ngScope_ = $scope;
        this.bufferRequest_ = null;
        this.requestBeingProcessed_ = null;
    }

    $onInit() {
        this.bufferRequest_ = this.requestMoreProducts_();
    }

    requestMoreProducts_() {
        LoadingService.getInstance().startLoad();

        const limit = PRODUCTS_PER_REQUEST;
        const outstandingProducts = this.isRequestBeingProcessed_() ?
            PRODUCTS_PER_REQUEST : 0;
        const skip = this.products_.length + outstandingProducts;

        return ProductsService.getProducts({limit, skip});
    }

    isRequestBeingProcessed_() {
        return !!this.requestBeingProcessed_;
    }

    processNextRequest_() {
        if (this.isRequestBeingProcessed_()) {
            return;
        }

        this.requestBeingProcessed_ = this.bufferRequest_;
        this.bufferRequest_ = this.requestMoreProducts_();

        this.requestBeingProcessed_.then((products) => {
            this.processNewProducts_(products);
            this.requestBeingProcessed_ = null;
        });
    }

    processNewProducts_(newProducts) {
        this.products_ = this.products_.concat(newProducts);
        this.productGroups_ = null;
        LoadingService.getInstance().endLoad();
        this.ngScope_.$digest();
    }

    /** @export */
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

    /** @export */
    setProgressIndicatorVisibility(visibility) {
        if (visibility) {
            this.processNextRequest_();
        }
    }
}

export default Controller;
