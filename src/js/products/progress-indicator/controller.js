import LoadingService from './service';

class Controller {
    /** @export */
    isLoading() {
        return LoadingService.getInstance().isLoading();
    }
}

export default Controller;
