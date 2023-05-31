import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String},
    phone: {type: String, required: true, unique: true, index: true},
    type: {type: String, enum: ['big', 'small']},
    password: {type: String, required: true},
    role: {type: String, require: true, default: 'usuario'}
});

export const userModel = mongoose.model(userCollection, userSchema);