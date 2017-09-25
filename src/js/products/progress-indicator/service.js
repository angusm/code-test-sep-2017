/**
 * @fileoverview Service for handling whether or not loading is happening.
 */

/** @type {?LoadingService} Singleton instance of Loading Service. */
let singleton;

class LoadingService {
    constructor() {
        /** @private {number} Number of loading going on. */
        this.loadCount_ = 0;
    }

    /**
     * Adds a load.
     */
    startLoad() {
        this.loadCount_++;
    }

    /**
     * Removes a load.
     */
    endLoad() {
        this.loadCount_--;
    }

    /**
     * @returns {boolean} Whether there is an active load.
     */
    isLoading() {
        return this.loadCount_ > 0;
    }

    /**
     * @returns {!LoadingService} A singleton instance of the LoadingService.
     */
    static getInstance() {
        singleton = singleton || new LoadingService();
        return singleton;
    }
}

export default LoadingService;