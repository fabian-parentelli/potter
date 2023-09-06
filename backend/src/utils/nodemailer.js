import nodemailer from 'nodemailer';
import config from '../config/dotEnv.config.js';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user: config.userNodemailer,
        pass: config.passNodemailer
    },
    tls: { rejectUnauthorized: false }
});