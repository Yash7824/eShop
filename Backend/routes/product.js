const express = require('express');
const router = express.Router();
const Product = require('../models/ProductSchema');
const { body, validationResult } = require('express-validator');
const dotenv = require("dotenv");
dotenv.config();
const authorization = require('../middleware/authorization');


// @router-1: GET api/product/getProducts
// @desc get all the products of the user [after login]
// @access PRIVATE
router.get('/getProducts', authorization, async (req, res) => {
    try {
        const userId = req.user.id;
        let products = [];
        products = await Product.find({ user: req.user.id });
        res.status(200).json(products);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router-2: GET api/product/showProducts
// @desc get all products of all user 
// @access PUBLIC
router.get('/showProducts', async (req, res) => {
    try {

        let products = [];
        products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})



// @router-3: POST api/product/addProduct
// @desc add a products of the user [after login]
// @access PRIVATE
router.post('/addProduct', [authorization, [
    body('title', 'enter a valid title').isLength({ min: 1 }),
    body('description', 'description must be atleast 1 character').isLength({ min: 1 }),
    body('category', 'category must be atleast 1 character').isLength({ min: 1 }),
    body('imageUrl', 'specify the image url').isLength({ min: 1 }),

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, category, imageUrl } = req.body;
        let product = new Product({
            title,
            description,
            category,
            imageUrl,
            user: req.user.id
        });

        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})


// @router-4: PUT api/product/updateProduct/:id
// @desc update product [after login]
// @access PRIVATE
router.put('/updateProduct/:id', authorization, async (req, res) => {
    try {
        const { title, description, category, imageUrl } = req.body;
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(400).json({ msg: 'No product found' });
        }

        let newProduct = {};

        if (title) newProduct.title = title;
        if (description) newProduct.description = description;
        if (category) newProduct.category = category;
        if (imageUrl) newProduct.imageUrl = imageUrl;

        // if the product doesnt belong to the authorized user
        if (product.user.toString() !== req.user.id) {
            return res.status(400).json({ msg: 'Product does not belong to you' });
        }

        // if the product belongs to the user
        product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });

        res.json(product);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})


// @router-5: DELETE api/product/deleteProduct/:id
// @desc delete product [after login]
// @access PRIVATE
router.delete('/deleteProduct/:id', authorization, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(400).json({ msg: 'No product found' });
        }

        // if the product doesnt belong to the authorized user
        if (product.user.toString() !== req.user.id) {
            return res.status(400).json({ msg: 'Product does not belong to you' });
        }

        // if the product belongs to the user
        product = await Product.findByIdAndDelete(req.params.id);
        res.json({ 'Deleted Product': product });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})










module.exports = router;