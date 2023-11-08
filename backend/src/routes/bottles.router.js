import Router from "./router.js";
import * as bottlesController from '../controllers/bottles.controller.js';
import { passportEnum } from "../config/enums.config.js";

export default class BottlesRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportEnum.JWT, bottlesController.addRemove);
        this.get('/', ['ADMIN'], passportEnum.JWT, bottlesController.getAll);  
        this.get('/:admin', ['ADMIN'], passportEnum.JWT, bottlesController.getByAdmin);  
        this.put('/:admin', ['ADMIN'], passportEnum.JWT, bottlesController.updateByAdmin);  
    };
};