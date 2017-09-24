import AdvertisementService from './inline-advertisement/service';
import DynamicDefaultMap from '../handies/structs/maps/dynamic_default';
import LoadingService from './progress-indicator/service';
import ProductGroup from './product-group';
import ProductsService from './service/service';

const PRODUCTS_PER_REQUEST = 10;

class Controller {
    /** @ngInject */
    constructor($scope) {
        this.ngScope_ = $scope;
        this.productGroups_ = [];
        this.requests_ = new Map();
        this.advertisements_ =
            new DynamicDefaultMap(
                () => AdvertisementService.getAdvertisement());
    }

    $onInit() {
        this.requestMoreProducts_();
        this.updateProductGroups_();
    }

    getSortedRequestKeys_() {
        return [...this.requests_.keys()].sort((a, b) => a - b);
    }

    getCurrentSkipValue_() {
        return this.getSortedRequestKeys_().reverse()[0] || 0;
    }

    getSkipValueForNextRequest_() {
        return this.getCurrentSkipValue_() + PRODUCTS_PER_REQUEST;
    }

    requestMoreProducts_() {
        LoadingService.getInstance().startLoad();
        const limit = PRODUCTS_PER_REQUEST;
        const skip = this.getSkipValueForNextRequest_();
        const request = ProductsService.getProducts({limit, skip});
        request.then(() => LoadingService.getInstance().endLoad());

        this.requests_.set(skip, request);
    }

    getSortedRequests_() {
        return this.getSortedRequestKeys_()
            .map((key) => this.requests_.get(key));
    }

    getAllProducts_() {
        return Promise.all(this.getSortedRequests_())
            .then((productLists) => {
                return productLists.reduce(
                    (acc, products) => acc.concat(products), []);
            });
    }

    getProductsSplitForGroups_() {
        return this.getAllProducts_()
            .then((products) => {
                const result = [];
                while (products.length) {
                    result.push(products.splice(0, 20));
                }
                return result;
            });
    }

    getProductGroups_() {
        return this.getProductsSplitForGroups_()
            .then((productGroups) => {
                return productGroups.map(
                    (products, index) => {
                        return new ProductGroup(
                            products, this.advertisements_.get(index));
                    });
            });
    }

    /** @export */
    getProductGroups() {
        return this.productGroups_;
    }

    updateProductGroups_() {
        this.getProductGroups_()
            .then((productGroups) => {
                this.productGroups_ = productGroups;
                this.requestMoreProducts_();
                this.ngScope_.$digest();
            });
    }

    /** @export */
    setProgressIndicatorVisibility(visibility) {
        if (!!visibility) {
            this.updateProductGroups_();
        }
    }
}

export default Controller;
