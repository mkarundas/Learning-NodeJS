import { Router } from 'express';
import { GlobalMiddlWare } from '../middlewares/GlobalMiddleware';
import { Utils } from '../Utils/Utils';
import { AddressController } from '../controllers/AddressController';
import { AddressValidator } from '../Validators/AddressValidator';

export class AddressRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/addresses',GlobalMiddlWare.auth, AddressController.getAddresses);
        this.router.get('/:id',GlobalMiddlWare.auth, AddressController.getAddressesById);
    }

    postRoutes() {
        this.router.post('/add', GlobalMiddlWare.auth, AddressValidator.addAddress(), GlobalMiddlWare.checkError, AddressController.addAddress);

    }

    patchRoutes() {
        this.router.patch('/edit/:id', GlobalMiddlWare.auth, AddressValidator.editAddress(), GlobalMiddlWare.checkError, AddressController.editAddress);
    }

    deleteRoutes() {
        this.router.delete('/delete/:id',GlobalMiddlWare.auth, AddressController.deleteAddress);
    }

}

export default new AddressRouter().router;