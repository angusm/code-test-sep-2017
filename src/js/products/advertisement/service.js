/**
 * @fileoverview Service for generating advertisement image URLs.
 * Will not generate links to the same image twice in a row.
 * TODO(Sept. 24 2017): Clarify backend modulo issue.
 *     Backend uses a modulo on the passed in value generated here to point to
 *     images. Using the MAX_VALUE provided in the original source this results
 *     in different values pointing to the same images which results in
 *     unwanted functionality. If the MAX_VALUE of 1000 is not necessary it can
 *     be replaced with a MAX_VALUE matching that in the backend and the
 *     separate BACKEND_MODULO value can be removed.
 */

/** @type {?number} The last generated advertisement value. */
let previousValue = null;

/**
 * Values can be generated up to but not including this value.
 * @const {number}
 */
const MAX_VALUE = 1000;

/**
 * Since the back-end cannot be changed, this is needed to ensure no duplicate
 * images are generated back-to-back.
 * @const {number}
 */
const BACKEND_MODULO = 16;

class AdvertisementService {
    /**
     * @returns {string} A link to an advertisement image.
     */
    static getAdvertisement() {
        return `/ad/?r=${AdvertisementService.generateAndStoreNextValue_()}`;
    }

    /**
     * Generates and stores the next advertisement number.
     *
     * Will not generate a number that will link to the same image as the
     * previously generated number.
     *
     * @returns {number} The advertisement number that was generated and stored.
     * @private
     */
    static generateAndStoreNextValue_() {
        /** @type {number} */
        const nextValue = this.getNextValue_();
        previousValue = nextValue;
        return nextValue;
    }

    /**
     * Generates the next advertisement number.
     *
     * Will not generate a number that will link to the same image as the
     * previously generated number.
     *
     * @returns {number} The generated advertisement number.
     * @private
     */
    static getNextValue_() {
        /** @type {number} */
        const generatedValue = Math.floor(Math.random() * MAX_VALUE);
        if (AdvertisementService.matchesPreviousValue_(generatedValue)) {
            return (generatedValue + 1) % MAX_VALUE;
        } else {
            return generatedValue;
        }
    }

    /**
     * Determines whether the given value will link to the same image as the
     * previously generated value.
     * @param {number} val The value in question.
     * @returns {boolean} Whether the given value will link to the same image
     *     as the previously generated value.
     * @private
     */
    static matchesPreviousValue_(val) {
        return previousValue % BACKEND_MODULO === val % BACKEND_MODULO;
    }
}

export default AdvertisementService;