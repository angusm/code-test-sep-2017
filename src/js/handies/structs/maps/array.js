import DynamicDefaultMap from './dynamic_default';
import isArray from '../../functions/is_array';

export default class ArrayMap extends DynamicDefaultMap {
    constructor() {
        super(() => {
            return [];
        });
    }

    clearArray(key) {
        this.set(key, []);
    }

    pushOnArray(key, value) {
        this.get(key).push(value);
    }

    removeFromArray(key, value) {
        let values = this.get(key);
        if (value.indexOf(value) != -1) {
            values.splice(values.indexOf(value), 1);
        }
    }

    set(key, value) {
        if (!isArray(value)) {
            throw new Error('Value is not an Array');
        }
        super.set(key, value);
    }

}
