import ProductsService from './service/service';

class Controller {
    constructor() {
        this.products_ = [];
    }

    $onInit() {
        ProductsService.getProducts().then((result) => {
            console.log(result);
        });
    }
}

export default Controller;
