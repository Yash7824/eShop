const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./config/db')

const port = process.env.PORT || 5000;

connectToDB();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'));
app.use('/api/checkout', require('./routes/checkout'));

app.listen(port, () => {
    console.log(`eShop-Backend is running at ${port} port`);
})



