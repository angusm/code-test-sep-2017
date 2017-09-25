/**
 * @fileoverview A multi-value-map that can be provided with a default generator
 * to create values for un-set keys.
 */
import MultiValueMap from './multi_value_map';

export default class DynamicDefaultMultiValueMap extends MultiValueMap {
    /**
     * @param {function(...*): *} defaultGenerator Generates default values for
     *     keys.
     */
    constructor(defaultGenerator) {
        super();
        this.dynamicDefaultMultiValueMapGenerator_ = defaultGenerator;
    }

    /**
     * Returns the value stored under the given keys.
     *
     * If no values are stored under the given keys then a value is generated
     * using the function given to the constructor. The generated value is then
     * stored under the given keys.
     *
     * @param {...*} arguments Keys whose value is desired.
     * @returns {*} The value stored under the given keys, or a generated
     *     default if no value was previously stored.
     */
    get() {
        const args = [...arguments];
        if (super.has(...args)) {
            return super.get(...args);
        } else {
            const generatedDefault =
                this.dynamicDefaultMultiValueMapGenerator_(...args);
            this.set(...args, generatedDefault);
            return generatedDefault;
        }
    }
}
