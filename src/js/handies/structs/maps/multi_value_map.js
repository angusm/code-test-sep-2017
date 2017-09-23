import DynamicDefaultMap from './dynamic_default';

const VALUE_KEY = Symbol('Key for values in MultiValueMap');

export default class MultiValueMap extends DynamicDefaultMap {
    constructor() {
        super(() => new MultiValueMap());
    }

    get() {
        if (!arguments.length) {
            console.log('Getting final value for MultiValueMap');
            if (this.has(VALUE_KEY)) {
                return super.get(VALUE_KEY);
            } else {
                return undefined;
            }
        } else {
            const [key, ...remainder] = arguments;
            console.log('Getting next key for MultiValueMap', key, remainder);
            return super.get(key).get(...remainder);
        }
    }

    set() {
        const args = [...arguments];
        const [value] = [...arguments].slice(-1);
        const keys = args.slice(0, -1);
        if (!keys.length) {
            return super.set(VALUE_KEY, value);
        } else {
            const [key, ...remainder] = keys;
            console.log('Getting next key for set in MultiValueMap', key, remainder);
            return super.get(key).set(...remainder, value);
        }
    }

    has() {
        if (!arguments.length) {
            return super.has(VALUE_KEY);
        } else {
            const [key, ...remainder] = arguments;
            console.log('Getting next key for has in MultiValueMap', key, remainder);
            return this.get(key).has(...remainder);
        }
    }
}
