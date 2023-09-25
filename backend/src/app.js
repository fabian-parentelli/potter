import express from 'express';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import mongoDB from './dao/mongo.js'
import cors from 'cors';
import config from './config/dotEnv.config.js';

import { userRouter } from './routes/index.router.js';
import { productRouter } from './routes/index.router.js';
import { customerRouter } from './routes/index.router.js'
import { cartRouter } from './routes/index.router.js';

const app = express();
mongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/customer', customerRouter);
app.use('/api/cart', cartRouter);

app.listen(config.port, () => console.log('Server conected'));