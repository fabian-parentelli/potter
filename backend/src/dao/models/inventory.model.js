import mongoose from "mongoose";

const inventoryCollection = 'inventories';

const inventorySchema = new mongoose.Schema({

    admin: {
        type: mongoose.Schema.Types.Mixed,
        default: 'treasure'
    },
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

inventorySchema.pre('find', function() {
    this.populate('products.product');
});

export const inventoryModel = mongoose.model(inventoryCollection, inventorySchema);