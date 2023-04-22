const express = require('express');
const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const app = express();
// const router = express.Router();

const requireUser =((req, res, next) => {
    if (!req.user) {
      res.status(401)
      res.send({
        name: "unauthorized Error",
        message: "You must be logged in to perform this action",
        error: 'unauthorizedError'
      });
      return;
    }
    next();
});
const secretKey = 'buzzkills';
const verifyAdminToken =(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split (' ')[1];
    if(!token) {
        return res.status(401).send('Access Denied');
    }
    try{
        const decoded = jwt.verify(token, secretKey);

        if(decoded.role !== 'admin') {
            return res.status(403).send('Forbidden: Only admins can edit or add baskets');
        } 
        req.user = decoded;
        next();
    } catch (error){
        return res.status(403).send ('Invalid Token')
    }
} 

module.exports = {requireUser, verifyAdminToken, secretKey};
