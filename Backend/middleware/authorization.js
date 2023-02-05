const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const jwtsecret = process.env.jwtsecret;

const authorization = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ msg: "No token found" });
    }

    try {
        const payload = jwt.verify(token, jwtsecret);
        req.user = payload.user;
        next();

    } catch (error) {
        console.error(error.message);
        res.status(401).send("Not Authorized");
    }
}

module.exports = authorization;