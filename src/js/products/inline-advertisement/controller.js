import AdvertisementService from './service';

class Controller {
    constructor() {
        this.advertisement = AdvertisementService.getAdvertisement();
    }

    getAdvertisement() {
        return this.advertisement;
    }
}

export default Controller;
