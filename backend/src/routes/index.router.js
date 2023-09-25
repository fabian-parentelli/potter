import ProductRouter from './products.router.js';
import UsersRouter from './users.router.js';
import CustomerRouter from './customers.router.js'
import CartRouter from './carts.router.js';

export const userRouter = new UsersRouter().getRouter();
export const productRouter = new ProductRouter().getRouter();
export const customerRouter = new CustomerRouter().getRouter();
export const cartRouter = new CartRouter().getRouter();
