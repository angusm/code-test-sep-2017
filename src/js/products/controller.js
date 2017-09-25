import AdvertisementService from './advertisement/service';
import DynamicDefaultMap from '../handies/structs/maps/dynamic_default';
import LoadingService from './progress-indicator/service';
import ProductGroup from './product-group';
import ProductsService from './service/service';
import isDef from '../handies/functions/is_def';

/** @type {Object<string, string>} Sort option constants. */
const SortOption = Object.freeze({
    ID: 'ID',
    PRICE: 'Price',
    SIZE: 'Size',
});

/** @const {number} Products retrieved in each request. */
const PRODUCTS_PER_REQUEST = 20;

/** @const {number} Number of products to display between ads. */
const PRODUCTS_BETWEEN_ADS = 20;

/** @const {!Array<string>} Display values for sort options. */
const SORT_OPTIONS = Object.freeze(Object.values(SortOption));

/** @type {Map<string, string>} Maps sort options to product fields. */
const sortFieldsBySortOption = new Map([
    [SortOption.ID, 'id'],
    [SortOption.PRICE, 'price'],
    [SortOption.SIZE, 'size'],
]);

class Controller {
    /**
     * @param {!angular.Scope} $scope The scope for the component. Needed to
     *     trigger digest loops.
     * @ngInject
     */
    constructor($scope) {
        /** @export {string} Currently selected sort option. */
        this.sortOption = SortOption.ID;

        /** @private {!angular.Scope} */
        this.ngScope_ = $scope;

        /** @private {!Array<!ProductGroup>>} */
        this.productGroups_ = [];

        /**
         * Maps skip parameters to the endpoint request promises.
         * @private {!Map<number, !Promise<!Array<!Product>>>}
         */
        this.requests_ = new Map();

        /**
         * Mapping of group indices to advertisement image URLs.
         * @private {!DynamicDefaultMap<number, string>}
         */
        this.advertisements_ =
            new DynamicDefaultMap(
                () => AdvertisementService.getAdvertisement());

        /** @private {boolean} Whether the last value has been received. */
        this.hasLoadedLastValue_ = false;
    }

    /** @export */
    $onInit() {
        this.requestMoreProducts_();
        this.updateProductGroups_();
    }

    /**
     * @returns {!Array<number>} The keys for request promises sorted.
     * @private
     */
    getSortedRequestKeys_() {
        return [...this.requests_.keys()].sort((a, b) => a - b);
    }

    /**
     * @returns {number} The last skip value used in a request.
     * @private
     */
    getCurrentSkipValue_() {
        return this.getSortedRequestKeys_().reverse()[0];
    }

    /**
     * @returns {number} The skip value to use in the next request in order to
     *     retrieve new values.
     * @private
     */
    getSkipValueForNextRequest_() {
        const currentSkipValue = this.getCurrentSkipValue_();
        if (isDef(currentSkipValue)) {
            return currentSkipValue + PRODUCTS_PER_REQUEST;
        } else {
            return 0;
        }
    }

    /**
     * Makes a new request to the backend to retrieve new product values.
     * The request is not sent if the last product values have already been
     * retrieved.
     * Adds a load to the LoadingService singleton when the request is started
     * and removes it once its completed.
     * The promise from the request is stored in the instance under the skip
     * value.
     * @private
     */
    requestMoreProducts_() {
        if (this.hasLoadedLastValue()) {
            return;
        }
        LoadingService.getInstance().startLoad();
        const limit = PRODUCTS_PER_REQUEST;
        const skip = this.getSkipValueForNextRequest_();
        const sort = this.getSortValue_();
        const request = ProductsService.getProducts({limit, skip, sort});
        request.then(() => LoadingService.getInstance().endLoad());
        request.then((products) => this.checkForFinalRequest_(products));

        this.requests_.set(skip, request);
    }

    /**
     * Checks if the given list of products is the final one that can be
     * expected from the products endpoint.
     * If there are fewer products than were requested the result is considered
     * to be the last one that could be expected.
     * @param {!Array<!Product>} products List of products to check.
     * @private
     */
    checkForFinalRequest_(products) {
        if (products.length < PRODUCTS_PER_REQUEST) {
            Promise.all(this.getSortedRequests_())
                .then(() => {
                    this.hasLoadedLastValue_ = true;
                });
        }
    }

    /**
     * @returns {boolean} Whether the last value has been loaded.
     * @export
     */
    hasLoadedLastValue() {
        return this.hasLoadedLastValue_;
    }

    /**
     * @returns {string} The field to sort on.
     * @private
     */
    getSortValue_() {
        return sortFieldsBySortOption.get(this.sortOption);
    }

    /**
     * @returns {!Array<!Promise<!Array<!Product>>>} Promises from requests
     *     sorted in the order their results should be displayed in.
     * @private
     */
    getSortedRequests_() {
        return this.getSortedRequestKeys_()
            .map((key) => this.requests_.get(key));
    }

    /**
     * @returns {!Promise<!Array<!Product>>} Promise resolving to all of the
     *     products retrieved from the backend so far.
     * @private
     */
    getAllProducts_() {
        return Promise.all(this.getSortedRequests_())
            .then((productLists) => {
                return productLists.reduce(
                    (acc, products) => acc.concat(products), []);
            });
    }

    /**
     * @returns {!Promise<!Array<!Array<!Product>>>} Promise resolving to lists
     *     of lists of products divided into groups to be displayed between ads.
     * @private
     */
    getProductsSplitForGroups_() {
        return this.getAllProducts_()
            .then((products) => {
                const result = [];
                while (products.length) {
                    result.push(products.splice(0, PRODUCTS_BETWEEN_ADS));
                }
                return result;
            });
    }

    /**
     * @returns {!Promise<!Array<!ProductGroup>>} Promise resolving to a list of
     *     product groups.
     * @private
     */
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

    /**
     * @returns {!Array<!ProductGroup>} List of product groups to display.
     * @export
     */
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

    /**
     * Callback triggered when the visibility of the loading indicator changes.
     * Requests more products if the loading indicator container is visible.
     * @param {boolean} visibility Whether the loading indicator is visible.
     * @export
     */
    setProgressIndicatorVisibility(visibility) {
        if (visibility) {
            this.updateProductGroups_();
        }
    }

    /**
     * @returns {!Array<string>} Display values for sort options.
     * @export
     */
    getSortOptions() {
        return SORT_OPTIONS;
    }

    /**
     * Callback handled when the sort option is changed.
     * Clears requested products and requests new ones based on the new sort
     * option.
     * @export
     */
    updateSortOption() {
        this.productGroups_ = [];
        this.requests_ = new Map();
        this.hasLoadedLastValue_ = false;
        this.updateProductGroups_();
    }
}

export default Controller;
