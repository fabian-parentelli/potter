import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import cors from 'cors';
import sessionRouter from './routers/session.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin:'http://127.0.0.1:5500', credentials: true }));

try {
    await mongoose.connect('mongodb+srv://fabianparentelli007code:MU8O6JWQtjzskwZE@clusterfabian.kpwq3c1.mongodb.net/potter?retryWrites=true&w=majority');
    console.log('Conected DB');
} catch (error) {
    console.log(error);
};

const sessionSecret = 'potter'

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 1200,
        session: sessionSecret
    }),
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge:  (5 * 60 * 60 * 1000) }
}));

app.use('/api/sessions', sessionRouter);

app.listen(8080, () => console.log('Listen to port 8080'));