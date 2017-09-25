import AdvertisementService from './service';

class Controller {
    constructor() {
        /** @type {?string} URL of an advertisement image. */
        this.advertisement = null;
    }

    /**
     * @export
     */
    $onInit() {
        this.advertisement =
            this.advertisement || AdvertisementService.getAdvertisement();
    }

    /**
     * The URL of the advertisement image to display.
     * @returns {?string}
     * @export
     */
    getAdvertisement() {
        return this.advertisement;
    }
}

export default Controller;
