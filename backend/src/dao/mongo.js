import mongoose from "mongoose";
import config from '../config/dotEnv.config.js'

export default function mongoDB() {
    try {
        console.log('Mongo conect');
        mongoose.connect(config.mongoDB);
    } catch (error) {
        console.log(error);
    };
};