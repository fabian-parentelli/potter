import { userRepository } from "../repositories/index.repositories.js";
import { createHash, isValidPassword } from '../utils/hashedPassword.js';
import { UserNotFound } from "../utils/custom-exceptions.js";
import { registerSuccess } from '../utils/html/registerSuccess.js';
import { recoverPassword_HTML } from '../utils/html/recoverPassword.js';
import { sendEmail } from './mail.service.js';
import { generateToken, passwordToken } from '../utils/jwt.js';
import { v4 as uuidv4 } from 'uuid';

const save = async (user) => {

    const { name, email, password } = user;
    if (!name || !email || !password) throw new UserNotFound('Datos incompletos');

    const exists = await userRepository.getByEmail(email);
    if (exists) throw new UserNotFound('El usuario ya existe');

    const hashedPassword = createHash(password);
    user.password = hashedPassword;

    const result = await userRepository.save(user);
    if (!result) throw new UserNotFound('User not save');

    const newUser = { ...result };
    delete newUser._doc.password;

    const emailTo = {
        to: user.email,
        subject: 'Registro exitoso',
        html: await registerSuccess(newUser._doc)
    };
    await sendEmail(emailTo);

    return { status: 'success', payload: newUser._doc };
};

const loginUser = async (user) => {
    const userDB = await userRepository.getByEmail(user.email);
    if (!userDB) throw new UserNotFound('El emial no existe');

    const comparePassword = isValidPassword(userDB, user.password);
    if (!comparePassword) throw new UserNotFound('La contraseña es incorrecta');

    delete userDB.password;
    const accesToken = generateToken(userDB);
    return { status: 'success', accesToken };
};

const recoverPassword = async (email) => {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new UserNotFound('Email incorrecto');

    const IdPass = uuidv4();
    await userRepository.updateIdPass(user._id, IdPass);

    user.recoverPassword = `http://localhost:8080/api/user/inetr_pass/${IdPass}`;

    const emailTo = {
        to: user.email,
        subject: 'Recuperar Contraseña',
        html: await recoverPassword_HTML(user.recoverPassword)
    }
    await sendEmail(emailTo);
    return { status: 'success' };
};

const inetr_pass = async (id) => {
    const user = await userRepository.getByIdPass(id);
    if (!user) throw new UserNotFound('Usuario no encontrado');

    const tokenPass = passwordToken(user.email);
    const url = `http://127.0.0.1:5500/frontend/pages/recoverPass.html?token=${tokenPass}`;
    return url
};

const newPassword = async (email, newPass) => {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new UserNotFound('Usuario no encontrado');

    const comparePassword = isValidPassword(user, newPass);
    if (comparePassword) throw new UserNotFound('La contraseña es incorrecta');

    const hasPass = createHash(newPass);
    user.password = hasPass;

    const result = userRepository.update(user._id, hasPass);
    if (!result) throw new UserNotFound('La contraseña no se pudo guardar');

    delete user.password;
    delete user.passId;
    return { status: 'success', user };
};

export { save, loginUser, recoverPassword, inetr_pass, newPassword };