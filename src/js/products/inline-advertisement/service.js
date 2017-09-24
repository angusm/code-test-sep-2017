let previousValue = null;

const MAX_VALUE = 1000;

// Since the back-end cannot be changed, this is needed to ensure no duplicate
// images are generated back-to-back.
const BACKEND_MODULO = 16;

class AdvertisementService {
    static getAdvertisement() {
        return `/ad/?r=${AdvertisementService.generateAndStoreNextValue_()}`;
    }

    static generateAndStoreNextValue_() {
        const nextValue = this.getNextValue_();
        previousValue = nextValue;
        return nextValue;
    }

    static getNextValue_() {
        const generatedValue = Math.floor(Math.random() * MAX_VALUE);
        if (AdvertisementService.matchesPreviousValue_(generatedValue)) {
            return (generatedValue + 1) % MAX_VALUE;
        } else {
            return generatedValue;
        }
    }

    static matchesPreviousValue_(val) {
        return previousValue % BACKEND_MODULO === val % BACKEND_MODULO;
    }
}

export default AdvertisementService;