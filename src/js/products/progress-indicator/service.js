let singleton;

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
        singleton = singleton || new LoadingService();
        return singleton;
    }
}

export default LoadingService;