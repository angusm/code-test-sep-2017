import MultiValueMap from './multi_value_map';

export default class DynamicDefaultMultiValueMap extends MultiValueMap {
    constructor(defaultGenerator) {
        super();
        this.dynamicDefaultMultiValueMapGenerator_ = defaultGenerator;
    }

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
