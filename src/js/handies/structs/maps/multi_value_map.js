import DynamicDefaultMap from './dynamic_default';
import MapWrapper from './map_wrapper';

const VALUE_KEY = Symbol('Key for values in MultiValueMap');

export default class MultiValueMap extends DynamicDefaultMap {
    constructor(innerMap=false) {
        super(() => new MultiValueMap(true));
        this.isInnerMap_ = innerMap;
    }

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

    has() {
        const [nextKey, ...remainder] = [...arguments];
        if (!arguments.length || (!remainder.length && nextKey === VALUE_KEY)) {
            return super.has(VALUE_KEY);
        } else {
            return super.get(nextKey).has(...remainder);
        }
    }
}
