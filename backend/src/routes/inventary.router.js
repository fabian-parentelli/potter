import Router from "./router.js";
import * as inventaryController from '../controllers/inventory.controller.js';
import { passportEnum } from "../config/enums.config.js";

export default class InventaryRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportEnum.JWT, inventaryController.newInventory);
        this.get('/', ['ADMIN'], passportEnum.JWT, inventaryController.getInventory);
        this.get('/:name', ['ADMIN'], passportEnum.JWT, inventaryController.getInvByName);
        this.put('/', ['ADMIN'], passportEnum.JWT, inventaryController.transferInventory);
        this.put('/:name', ['ADMIN'], passportEnum.JWT, inventaryController.modifyInventory);
    };
};