let previousValue = null;

class AdvertisementService {
    static getAdvertisement() {
        return `/ad/?r=${AdvertisementService.getNextValue_()}`;
    }

    static getNextValue_() {
        const generatedValue = Math.floor(Math.random() * 1000);
        const nextValue = previousValue !== generatedValue ?
            generatedValue : previousValue + 1;
        previousValue = nextValue;
        return nextValue
    }
}

export default AdvertisementService;