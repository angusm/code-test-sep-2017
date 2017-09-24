import DynamicDefaultMultiValueMap from '../../handies/structs/maps/dynamic_default_multi_value_map';
import Product from './product';
import SimpleAjax from '../../../../node_modules/simple-ajax/index';
import constants from '../../constants';

const cache = new DynamicDefaultMultiValueMap(getProductsForCache);
const ParamKeys = Object.freeze({
    LIMIT: 'limit',
    SKIP: 'skip',
    SORT: 'sort',
});
const API_ENDPOINT = '/api/products';

function parseJSONResponse(response) {
    const responseLines = response.split('\n');
    const validResponseLines = responseLines.filter((line) => !!line);
    return validResponseLines.map((responseLine) => JSON.parse(responseLine));
}

function getProductsForCache(limit = null, skip = null, sort = null) {
    return new Promise((resolve, reject) => {
        const request = new SimpleAjax({
            url: getFullQueryURL(limit, skip, sort),
            method: 'GET',
        });
        request.on(constants.SimpleAjax.Event.SUCCESS, (event) => {
            const parsedResponse = parseJSONResponse(event.target.response);
            console.log(parsedResponse);
            const instances = parsedResponse.map((data) => new Product(data));
            console.log(instances);
            resolve(instances);
        });
        request.on(constants.SimpleAjax.Event.ERROR, (event) => {
            reject(event);
        });
        request.send();
    });
}

function getFullQueryURL(limit = null, skip = null, sort = null) {
    const queryParams = getQueryParams(limit, skip, sort);
    if (queryParams) {
        return `${API_ENDPOINT}?${queryParams}`;
    } else {
        return API_ENDPOINT;
    }
}

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
     */
    static getProducts({limit = null, skip = null, sort = null} = {}) {
        return cache.get(limit, skip, sort);
    }
}

export default Service;
