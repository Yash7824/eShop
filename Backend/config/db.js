const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const db = process.env.DATABASE;

const connectToDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(db);
        console.log("Connected to Mongo");
    }
    catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectToDB;