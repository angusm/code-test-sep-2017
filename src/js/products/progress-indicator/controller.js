import LoadingService from './service';

class Controller {
    /**
     * @returns {boolean} Whether there is currently loading going on.
     * @export
     */
    isLoading() {
        return LoadingService.getInstance().isLoading();
    }
}

export default Controller;
