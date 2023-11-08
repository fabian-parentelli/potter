import express from 'express';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import mongoDB from './dao/mongo.js'
import cors from 'cors';
import config from './config/dotEnv.config.js';

import { 
    userRouter, productRouter, customerRouter, cartRouter, 
    inventaryRouter, inventoryDocRouter, bottlesRouter 
} from './routes/index.router.js';

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
app.use('/api/inventory', inventaryRouter);
app.use('/api/inventorydoc', inventoryDocRouter);
app.use('/api/bottle', bottlesRouter);

app.listen(config.port, () => console.log('Server conected'));