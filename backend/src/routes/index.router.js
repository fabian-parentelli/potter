import ProductRouter from './products.router.js';
import UsersRouter from './users.router.js';

export const userRouter = new UsersRouter().getRouter();
export const productRouter = new ProductRouter().getRouter();