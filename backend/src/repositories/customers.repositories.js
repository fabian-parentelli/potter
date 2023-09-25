import { customerManager } from '../dao/manager/index.manager.js';
import CustomersDto from '../dao/DTOS/customers.dto.js';

export default class UserRepository {

    getByPhone = async (phone) => {
        const result = await customerManager.getByPhone(phone);
        return result;
    };

    save = async (customer) => {
        const newCustomer = new CustomersDto(customer)
        const result = await customerManager.save(newCustomer);
        return result;
    }

    get = async (query) => {
        const result = await customerManager.get(query);
        return result;
    };

    getById = async (id) => {
        const result = await customerManager.getById(id);
        return result;
    };

    getByName = async (name) => {
        const result = await customerManager.getByName(name);
        return result;
    };

    getByCart = async (cart) => {
        const result = await customerManager.getByCart(cart);
        return result;
    };

    update = async (customer) => {
       const result = await customerManager.update(customer);
       return result;
    };
};