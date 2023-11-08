import mongoose from "mongoose";

const bottlesCollection = 'bottles';

const bottleSchema = new mongoose.Schema({

    admin: { type: String },
    products: {
        type: [
            {
                product: { type: String },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        ],
        default: [],
    },
    credit: {
        type: [
            {
                product: { type: String },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        ]
    }
});

export const bottleModel = mongoose.model(bottlesCollection, bottleSchema);