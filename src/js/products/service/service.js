import DynamicDefaultMultiValueMap from '../../handies/structs/maps/dynamic_default_multi_value_map';
import Product from './product';
import SimpleAjax from '../../../../node_modules/simple-ajax/index';
import constants from '../../constants';

/**
 * Object in a product endpoint response.
 * @typedef {{
 *     id: number,
 *     size: number,
 *     price: number,
 *     face: string,
 *     date: string
 *   }} ProductResponseObject
 */

/**
 * Promise resolving to products.
 * @typedef {!Promise<!Array<!Product>>} ProductsPromise
 */

/**
 * Cache for request promises.
 * @type {!DynamicDefaultMultiValueMap<number, number, string, ProductsPromise>}
 */
const cache = new DynamicDefaultMultiValueMap(getProductsForCache);

/** @type {!Object<string, string>} Parameter key constants. */
const ParamKeys = Object.freeze({
    LIMIT: 'limit',
    SKIP: 'skip',
    SORT: 'sort',
});

/** @const {string} The API endpoint for the products. */
const API_ENDPOINT = '/api/products';

/**
 * Parses text returned by the product endpoint, turning it into objects.
 * @param {string} response The response returned from the product endpoint.
 * @returns {!Array<!ProductResponseObject>} Objects parsed from the response.
 */
function parseJSONResponse(response) {
    const responseLines = response.split('\n');
    const validResponseLines = responseLines.filter((line) => !!line);
    return validResponseLines.map((responseLine) => JSON.parse(responseLine));
}

/**
 * Returns a promise resolving to raw product objects for storage in the cache.
 * @param {?number} limit Number of entries to retrieve.
 * @param {?number} skip Number of entries to skip.
 * @param {?string} sort Field to sort on.
 * @returns {ProductsPromise} Objects parsed from a product endpoints response.
 */
function getProductsForCache(limit = null, skip = null, sort = null) {
    return new Promise((resolve, reject) => {
        const request = new SimpleAjax({
            url: getFullQueryURL(limit, skip, sort),
            method: 'GET',
        });
        request.on(constants.SimpleAjax.Event.SUCCESS, (event) => {
            const parsedResponse = parseJSONResponse(event.target.response);
            const instances = parsedResponse.map((data) => new Product(data));
            resolve(instances);
        });
        request.on(constants.SimpleAjax.Event.ERROR, (event) => reject(event));
        request.send();
    });
}

/**
 * @param {?number} limit Number of entries to retrieve.
 * @param {?number} skip Number of entries to skip.
 * @param {?string} sort Field to sort on.
 * @returns {string} URL of the endpoint to hit for the given parameters
 */
function getFullQueryURL(limit = null, skip = null, sort = null) {
    const queryParams = getQueryParams(limit, skip, sort);
    if (queryParams) {
        return `${API_ENDPOINT}?${queryParams}`;
    } else {
        return API_ENDPOINT;
    }
}

/**
 * @param {?number} limit Number of entries to retrieve.
 * @param {?number} skip Number of entries to skip.
 * @param {?string} sort Field to sort on.
 * @returns {string} The query params to add to an endpoint URL for the given
 *     values.
 */
function getQueryParams(limit = null, skip = null, sort = null) {
    const params = [
        [ParamKeys.LIMIT, limit],
        [ParamKeys.SKIP, skip],
        [ParamKeys.SORT, sort],
    ];
    const filteredParams = params.filter(([key, value]) => !!value);
    return filteredParams.map((keyValue) => keyValue.join('=')).join('&');
}

class Service {
    /**
     * @param {?number} limit The maximum number of entries to return, or null
     *     for no limit.
     * @param {?number} skip The number of entries to skip before returning the
     *     result set, or null to start from the beginning.
     * @param {?string} sort The field to sort on, or null to avoid sorting.
     * @returns {ProductsPromise} Objects parsed from a product endpoints
     *     response.
     */
    static getProducts({limit = null, skip = null, sort = null} = {}) {
        return cache.get(limit, skip, sort);
    }
}

export default Service;
