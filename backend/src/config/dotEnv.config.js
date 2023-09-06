import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    privateKeyPassport: process.env.PRIVATEKEYPASSPORT,
    mongoDB: process.env.MONGODB,
    userNodemailer: process.env.USER_NODEMAILER,
    passNodemailer: process.env.PASS_NODEMAILER,
    privateKey: process.env.PRIVATE_KEY,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
};