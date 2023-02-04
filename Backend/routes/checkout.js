const express = require('express');
const router = express.Router();
const Product = require('../models/ProductSchema');
const User = require('../models/UserSchema');
const dotenv = require("dotenv");
dotenv.config();
const authorization = require('../middleware/authorization');

// @route-1: GET api/checkout/getProducts
// @desc get all the products which user wants to buy.
// @access PRIVATE
router.get('/getProducts', authorization, async (req, res) => {
    try {
        const userId = req.user.id;
        let products = [];
        products = await Product.findById({ user: userId });
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})









module.exports = router;