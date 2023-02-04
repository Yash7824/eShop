const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        default: 1
    },
    imageUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Products = mongoose.model('products', ProductSchema);
module.exports = Products;
