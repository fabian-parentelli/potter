import Router from "./router.js";
import * as customerController from '../controllers/customers.controller.js';
import { passportEnum } from "../config/enums.config.js";

export default class CustomerRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportEnum.JWT, customerController.save);
        this.get('/', ['ADMIN'], passportEnum.JWT, customerController.get);
        this.get('/:name', ['ADMIN'], passportEnum.JWT, customerController.getByName);
        this.get('/:cid', ['ADMIN'], passportEnum.JWT, customerController.getByCart);
        this.put('/', ['ADMIN'], passportEnum.JWT, customerController.update);
    };
};