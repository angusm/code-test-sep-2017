import AdvertisementService from './inline-advertisement/service';
import DynamicDefaultMap from '../handies/structs/maps/dynamic_default';
import LoadingService from './progress-indicator/service';
import ProductGroup from './product-group';
import ProductsService from './service/service';
import isDef from '../handies/functions/is_def';

const SortOption = Object.freeze({
    ID: 'ID',
    PRICE: 'Price',
    SIZE: 'Size',
});
const PRODUCTS_PER_REQUEST = 20;
const SORT_OPTIONS = Object.freeze(Object.values(SortOption));
const sortFieldsBySortOption = new Map([
    [SortOption.ID, 'id'],
    [SortOption.PRICE, 'price'],
    [SortOption.SIZE, 'size'],
]);

class Controller {
    /** @ngInject */
    constructor($scope) {
        this.ngScope_ = $scope;
        this.productGroups_ = [];
        this.requests_ = new Map();
        this.advertisements_ =
            new DynamicDefaultMap(
                () => AdvertisementService.getAdvertisement());
        this.sortOption = SortOption.ID;
    }

    $onInit() {
        this.requestMoreProducts_();
        this.updateProductGroups_();
    }

    getSortedRequestKeys_() {
        return [...this.requests_.keys()].sort((a, b) => a - b);
    }

    getCurrentSkipValue_() {
        return this.getSortedRequestKeys_().reverse()[0];
    }

    getSkipValueForNextRequest_() {
        const currentSkipValue = this.getCurrentSkipValue_();
        if (isDef(currentSkipValue)) {
            return currentSkipValue + PRODUCTS_PER_REQUEST;
        } else {
            return 0;
        }
    }

    requestMoreProducts_() {
        LoadingService.getInstance().startLoad();
        const limit = PRODUCTS_PER_REQUEST;
        const skip = this.getSkipValueForNextRequest_();
        const sort = this.getSortValue_();
        const request = ProductsService.getProducts({limit, skip, sort});
        request.then(() => LoadingService.getInstance().endLoad());

        this.requests_.set(skip, request);
    }

    getSortValue_() {
        return sortFieldsBySortOption.get(this.sortOption) || null;
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
                console.log('DIGEST');
            });
    }

    /** @export */
    setProgressIndicatorVisibility(visibility) {
        if (!!visibility) {
            this.updateProductGroups_();
        }
    }

    /** @export */
    getSortOptions() {
        return SORT_OPTIONS;
    }

    /** @export */
    updateSortOption() {
        console.log('Sort option changed');
        this.productGroups_ = [];
        this.requests_ = new Map();
        this.updateProductGroups_();
    }
}

export default Controller;
