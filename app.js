require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require('morgan');
const client = require('./db/client');
const path = require("path");
// const apiRouter = require("./api/index");

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

// app.use('/api', apiRouter);

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log("BODY LOGGER START");
    console.log(req.body);
    console.log("BODY LOGGER END");

    next();
});



client.connect();

module.exports = app;

