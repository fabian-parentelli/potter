import Router from "./router.js";
import * as inventaryDocController from '../controllers/inventoryDoc.controller.js';
import { passportEnum } from "../config/enums.config.js";

export default class InventoryDocRouter extends Router {
    init() {
        this.get('/', ['ADMIN'], passportEnum.JWT, inventaryDocController.getInventory)
    };
};