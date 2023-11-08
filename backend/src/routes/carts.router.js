import Router from "./router.js";
import * as cartsController from '../controllers/carts.controller.js';
import { passportEnum } from "../config/enums.config.js";

export default class CartRouter extends Router {
    init() {
        this.post('/', ['PUBLIC'], passportEnum.NOTHING, cartsController.newCart);
        this.post('/add', ['ADMIN'], passportEnum.JWT, cartsController.addToCart);
        this.post('/purchase', ['ADMIN'], passportEnum.JWT, cartsController.purchase);
        this.get('/:cid', ['PUBLIC'], passportEnum.NOTHING, cartsController.getById);
        this.get('/:cid/user/:uid', ['ADMIN'], passportEnum.JWT, cartsController.getTotal);
    };
};