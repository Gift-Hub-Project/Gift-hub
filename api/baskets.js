const express = require('express');
const {
    createBasket,
    getAllBaskets, 
    getBasketById,
    getBasketByName, 
    updateBasket,
    destroyBasket,
    // getBasketsByOccasionId
} = require('../db');
const { adminToken } = require('./utils');
const router = express.Router();

require('dotenv').config();

//GET /api/baskets
router.get('/', async (req, res) => {
    
    try {
        const baskets = await getAllBaskets();
        res.send(baskets);
    } catch (error) {
        console.log(error)
    }
});

//POST/api/baskets
router.post('/', adminToken, async (req, res) => {
    const { name, description, occasionId, quantity, price } = req.body;
    try {
        const basket = await createBasket({name});
        if (basket) {
            res.send({ 
                name: `basket exists error`, 
                message: `An basket with name ${name} already exists`, 
                error: `basketExistsError` });
        } else {
            const newBasket = await createBasket({
                name, 
                description, 
                occasionId,
                quantity, 
                price
            })
            res.send(newBasket);
        }
    } catch (error) {
        console.log(error)
    }
});

//PATCH/api/baskets

router.patch('/:id', adminToken, async (req,res, next) => {
    const basketId = req.params.id;
    const { name, description, occasionId, quantity, price } = req.body;

    try {
        const basket = await updateBasket(basketId, {
            name,
            description,
            occasionId,
            quantity, 
            price
        });

        if(!basket) {
            const error= new Error(`Basket with ID ${basketId} can only be edited by admin`);
            error.statusCode = 401;
            throw error;
        }
        res.send(basket);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

//DELETE/api/baskets

router.delete('/:basketId', adminToken, async (req,res,next) => {
    const basketId = req.params.basketId;

    try {
        const deletedBasket = await destroyBasket(basketId);

        if(!deletedBasket) {
            const error = new Error(`Basket with ID ${basketId} can only be delted by admin`);
            error.statusCode = 401;
            throw error;
        }
        res.send({ message: `Basket with ID ${basketId} has been deleted`})
    } catch (error) {
        console.error(error);
        next(error)
    }
})
//GET/api/baskets/:basketId

router.get('/id/:basketId', async (req, res) => {
    const basketId = req.params.basketId;
    
    try{
        const basket = await getBasketById(basketId);
        res.send(basket);
    } catch(error) {
        console.error(error)
;    }
})

//GET/api/baskets/:name

router.get('/name/:name', async (req,res) => {
    const basketName = req.params.name;
    
    try{
        const basket = await getBasketByName(basketName);
        res.send(basket);
    } catch(error){
        console.error(error);
    }
});

//GET/api/baskets/:occasionId

router.get('/:occasionId', async (req,res) => {
    const basketOccasionId = req.params.occasionId;
    
    try {
        const basket = await getBasketsByOccasionId(basketOccasionId);
        res.send(basket);
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;