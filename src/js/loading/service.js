const singleton = new LoadingService();

class LoadingService {
    constructor() {
        this.loadCount = 0;
    }

    startLoad() {
        this.loadCount++;
    }

    endLoad() {
        this.loadCount--;
    }

    isLoading() {
        return this.loadCount > 0;
    }

    static getInstance() {
        return singleton;
    }
}

export default LoadingService;