import MapWrapper from './map_wrapper';

export default class DynamicDefaultMap extends MapWrapper {
    constructor(defaultGenerator) {
        super();
        this.defaultGenerator_ = defaultGenerator;
    }

    get(key) {
        if (super.has(key)) {
            return super.get(key);
        } else {
            let generatedDefault = this.defaultGenerator_(key);
            this.set(key, generatedDefault);
            return generatedDefault;
        }
    }
}
