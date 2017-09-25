/**
 * @fileoverview Establishes a class that can be used as a map to store values
 * under an arbitrary number of keys.
 *
 * Ex.
 *
 * const foo = new MultiValueMap();
 *
 * foo.set(1, 2, 3, 4);
 * foo.get(1, 2, 3); // Returns 4
 */

import DynamicDefaultMap from './dynamic_default';

/** @type {!Symbol} Key for storing actual values. */
const VALUE_KEY = Symbol('Key for values in MultiValueMap');

class MultiValueMap extends DynamicDefaultMap {
    /**
     * @param {boolean} innerMap Whether this map is only used to store internal
     *     structures and should not be directly accessible to an end user.
     */
    constructor(innerMap = false) {
        super(() => new MultiValueMap(true));

        /**
         * @private {boolean} Whether this map is only used to store internal
         *     structures and should not be directly accessible to an end user.
         */
        this.isInnerMap_ = innerMap;
    }

    /**
     * Returns a value stored under the given keys.
     * @param {...*} arguments Keys to use to retrieve a value.
     * @returns {*} Value stored under the given keys.
     */
    get() {
        const [nextKey, ...remainder] = [...arguments];
        if (!arguments.length) {
            if (super.has(VALUE_KEY)) {
                return super.get(VALUE_KEY);
            } else {
                return undefined;
            }
        } else {
            return super.get(nextKey).get(...remainder);
        }
    }

    /**
     * Stores a value under the given keys.
     *
     * WARNING: The return value of this function is not as intended and will
     * be updated. Please do not build functionality around it.
     *
     * @param {...*} arguments Keys used to store a value, with the final value
     *     in the arguments being the value to be stored.
     * @returns {!Map<*, *>} The inner map storing the final value.
     */
    set() {
        const [nextKey, ...remainder] = [...arguments];
        const [value] = remainder.slice(-1);
        // Recursion will not move past arguments of length 2, so a call of
        // length 1 is a deliberate assignment to undefined.
        if (arguments.length === 1) {
            return super.get(nextKey).set(VALUE_KEY, undefined);

        // Default case for any key(s)-value assignments
        } else if (arguments.length === 2) {
            const isInnerMap =
                value instanceof MultiValueMap && value.isInnerMap_;
            const isSpecialKey = nextKey === VALUE_KEY;

            if (isInnerMap || isSpecialKey) {
                return super.set(nextKey, value);
            } else {
                return super.get(nextKey).set(VALUE_KEY, value);
            }
        } else {
            return super.get(nextKey).set(...remainder);
        }
    }

    /**
     * Returns whether there is a value stored under the given keys.
     *
     * @param {...*} arguments The keys in question.
     * @returns {boolean} Whether there is a value stored under the given keys.
     */
    has() {
        const [nextKey, ...remainder] = [...arguments];
        if (!arguments.length || (!remainder.length && nextKey === VALUE_KEY)) {
            return super.has(VALUE_KEY);
        } else {
            return super.get(nextKey).has(...remainder);
        }
    }
}

export default MultiValueMap;