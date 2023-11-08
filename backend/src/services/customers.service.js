import { CustomerNotFound } from "../utils/custom-exceptions.js";
import { customerRepository } from "../repositories/index.repositories.js";
import { sendEmail } from './mail.service.js'
import { newCustomer } from '../utils/html/newCustomer.js';


const save = async (customer, user) => {

    const { name, phone, type } = user;
    if (!name || !phone || !type) throw new CustomerNotFound('Datos incompletos');

    const exists = await customerRepository.getByPhone(customer.phone);
    if (exists) throw new CustomerNotFound('El cliente ya existe');

    customer.customerOf = user.name;

    const result = await customerRepository.save(customer);
    if (!result) throw new CustomerNotFound('User not save');

    if (customer.email) {
        const emailTo = {
            to: customer.email,
            subject: 'Registro exitoso',
            html: await newCustomer(customer)
        };
        await sendEmail(emailTo);
    };

    return { status: 'success', payload: result };
};

const get = async (name, customerOf, type) => {
    const query = {};
    if (name) query.name = name.toLowerCase();
    if (customerOf != 'undefined') query.customerOf = customerOf;
    if (type != 'undefined') query.type = type;

    const result = await customerRepository.get(query);
    if (result.length === 0) throw new CustomerNotFound('No se pueden encontrar los clientes');
    return result;
};

const getByName = async (name) => {
    const result = await customerRepository.getByName(name);
    if (!result) throw new CustomerNotFound('El cliente no se encuentra registrado');
    return result;
};

const getById = async (id) => {
    const result = await customerRepository.getById(id);
    if (!result) throw new CustomerNotFound('El cliente no se encuentra');
    return result;
};

const getByCart = async (cart) => {
    const result = await customerRepository.getByCart(cart);
    if (!result) throw new CustomerNotFound('El cliente no se encuentra');
    return result;
};

const update = async (customer) => {
    const result = await customerRepository.getByName(customer.name);
    if (!result) throw new CustomerNotFound('El cliente no se encuentra registrado');

    const newCustomer = { ...result, ...customer };
    const updateCustomer = await customerRepository.update(newCustomer);
    return { status: 'success', updateCustomer };
};

export { save, get, getByName, update, getByCart, getById };