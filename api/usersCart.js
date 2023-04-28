const express = require('express');
// const { requireUser } =require('./utils');
const {
    deleteFromUserCart,
    getCartContent,
    addItemToCart,
    removeItemFromCart
} = require('../db');
const router = express.Router();
require('dotenv').config();


//GET /api/cart   -display user cart
router.get('/', async (req, res) => {

    try {
        const content = await getCartContent(); 
        res.send({ message: "Fetched items in cart.", content }); 
    } catch (error) {
        console.log(error)
    }
});

//PATCH/api/cart/item   -add item to cart, update number of items
router.patch('/:items', async (req, res, next) => { 
        const { basketId } = req.params

    try {
        await addItemToCart(items, userId) 
        res.send({ message: "Item added to cart!"});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//PATCH/api/cart    -empty cart after purchase
router.patch('/', async (req, res, next) => {
    let { items, numberOfItems } = req.body

    try {
        if(items != 0 && numberOfItems != 0) {
            items = 0
            numberOfItems = 0
            const deleteAll = await deleteFromUserCart()
            res.send({ message: "Cart is now Empty.", deleteAll })
        } else { 
            res.send({ message: "Cart "}) 
        }
    } catch(err) {
        next(error);
    }
})

//DELETE/api/cart   -delete item from cart
router.delete('/:items', async (req, res, next) => { 
    const { items } = req.params

    try {        
            await removeItemFromCart(cartId, basketId, 1);
            res.send({ message: "Item deleted from cart."}) 
        if(items.length === 0){
            res.send({ message: "No item to delete."});
        }
    } catch(error) {
        console.error(error);
        next(error)
  }
})


module.exports = router;