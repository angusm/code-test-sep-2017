import DynamicDefaultMap from './dynamic_default';
import MapWrapper from './map_wrapper';

const VALUE_KEY = Symbol('Key for values in MultiValueMap');

export default class MultiValueMap extends DynamicDefaultMap {
    constructor() {
        super(() => new MultiValueMap());
    }

    get() {
        console.log('Raw get call', arguments);
        if (this.has(...arguments)) {
            return this.getInnerMap_(...arguments).getValueForMap_();
        } else {
            return undefined;
        }
    }

    /**
     * Return the inner map, up until the point where the VALUE_KEY should be
     * used to return the value at that level of values.
     * @private
     */
    getInnerMap_() {
        console.log({'args':arguments});
        if (!arguments.length) {
            console.log('Got to inner most map');
            return this;
        } else {
            const [key, ...remainder] = arguments;
            console.log({key, remainder, 'a':this});
            const nextMap = super.get(key);
            console.log('Next map', nextMap);
            return super.get(key).getInnerMap_(...remainder);
        }
    }

    setValueForMap_(value) {
        return super.set(VALUE_KEY, value);
    }

    hasForMap_() {
        return super.has(VALUE_KEY);
    }

    getValueForMap_() {
        return super.get(VALUE_KEY);
    }

    set() {
        // Short circuit if there is only one key and the key is VALUE_KEY
        const args = [...arguments];
        const [value] = [...arguments].slice(-1);
        const keys = args.slice(0, -1);
        if (args.length === 2) {
            const key = keys[0];
            if (!super.has(key)) {
                super.set(key, new MultiValueMap());
            }
            super.get(key).setValueForMap_(value);
        } else {
            return this.getInnerMap_(...keys).setValueForMap_(value);
        }
    }

    has() {
        return this.getInnerMap_(...arguments).hasForMap_();
    }
}
