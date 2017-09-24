let previousValue = null;

const MAX_VALUE = 1000;

class AdvertisementService {
    static getAdvertisement() {
        return `/ad/?r=${AdvertisementService.getNextValue_()}`;
    }

    static getNextValue_() {
        const generatedValue = Math.floor(Math.random() * MAX_VALUE);
        const nextValue = previousValue !== generatedValue ?
            generatedValue : (previousValue + 1) % MAX_VALUE;
        previousValue = nextValue;
        return nextValue
    }
}

export default AdvertisementService;