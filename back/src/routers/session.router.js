import { Router } from 'express';
import session from 'express-session';
import UserManager from '../dao/managers/user.manager.js';

const router = new Router();
const userManager = new UserManager();

router.post('/login', async (req, res) => {


    // console.log(req.headers.cookie);



    const { phone, password } = req.body;

    console.log(req.session.user);

    if (req.session?.user) return console.log(('error'));
    const result = await userManager.login(phone, password);
    if (result?.error) {
        res.status(400).send({ error: result.error });
    } else {
        req.session.user = {
            name: result.payload.name,
            phone: phone,
            role: result.payload.role
        };
        console.log(req.session.user);
        res.send({ status: 'Success' });
    };
    // console.log(req.session.user);
    // res.send({ status: 'Success' });
});

router.post('/register', async (req, res) => {
    const result = await userManager.register(req.body);
    console.log(result);
    result?.error ? res.status(400).send({ error: result.error }) : res.send({ succes: 'The record id correct' });
});

export default router;