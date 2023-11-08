import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const inventoryDocCollection = 'inventoryDoc';

const inventoryDocSchema = new mongoose.Schema({

    detail: { type: String, require: true },
    date: { type: String, require: true },
    user: { type: String, require: true },
    customer: { type: String },
    fromTo: { type: String },
    reason: { type: String },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        ],
        default: [],
    }
});

inventoryDocSchema.plugin(mongoosePaginate);

inventoryDocSchema.pre('find', function () {
    this.populate('products.product');
});

export const inventoryDocModel = mongoose.model(inventoryDocCollection, inventoryDocSchema);