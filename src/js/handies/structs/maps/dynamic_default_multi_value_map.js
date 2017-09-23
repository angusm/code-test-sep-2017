import MultiValueMap from './multi_value_map';

export default class DynamicDefaultMultiValueMap extends MultiValueMap {
    constructor(defaultGenerator) {
        super();
        this.defaultGenerator_ = defaultGenerator;
    }

    get() {
        if (super.has(...arguments)) {
            return super.get(...arguments);
        } else {
            const generatedDefault = this.defaultGenerator_(...arguments);
            this.set(...arguments, generatedDefault);
            return generatedDefault;
        }
    }
}
