const express = require('express');
const apiRouter = express.Router();

apiRouter.use(express.json());


module.exports = {
    apiRouter
};