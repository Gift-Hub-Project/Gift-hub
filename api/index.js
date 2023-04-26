const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/users');
const { JWT_SECRET } = process.env;
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length)
        try {
            const { id } = jwt.verify(token, JWT_SECRET)
            if (id) {
                req.user = await getUserById(id)
                next();
            }
        } catch (error) {
            console.error(error)
        }
    }
});



router.use((req, res, next) => {
    if (req.user) {
        console.log(`user is set: ${req.user}`);
    }
    next();
});

// GET /api/health
router.get('/health', async (req, res, next) => {
    res.status(200);
    res.send({ message: "Api is healthy" });
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/baskets
const basketsRouter = require('./baskets');
router.use('/baskets', basketsRouter);

// ROUTER: /api/occasions
const occasionsRouter = require('./occasions');
router.use('/occasions', occasionsRouter);

// ROUTER: /api/userscart
const userscartRouter = require('./userscart');
router.use('/userscart', userscartRouter);

router.get('*', async (req, res, next) => {
    res.status(404);
    res.send({ message: "Page not found!" });
});

module.exports = router;
