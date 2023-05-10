const express = require('express');
const { requireUser } = require('./utils');
const { createCart, createGuestCart, getCartById } = require('../db/usersCart');
const {
  addItemToCart,
  getCartContent,
  removeItemFromCart,
  updateCartBaskets,
  removeOneItem,
  addOneItem
} = require('../db/cart_baskets');
const { getBasketById } = require('../db');
const router = express.Router();
require('dotenv').config();

router.get('/getCartByUserId', requireUser, async (req, res, ) => {
  const  userId  = req.user.id
  try {c
   const { id }= await getCartById(userId)
    res.send({ message: "Got cartId", id})
  } catch(error){
    console.error(error);
  }
}) 

router.get('/:cartId', async (req, res) => {
  const { cartId } = req.params;
  try {
    const content = await getCartContent(cartId);
    let basketsArr = await Promise.all(content.map(async (object) => {
      return await getBasketById(object.basketId)
    }))
    let cartObject = { id: cartId, cartItems: basketsArr }
    res.send({ message: "Fetched items in cart!", cartObject });
  } catch (error) {
    console.error(error)
  }
});

router.post('/', requireUser, async (req, res) => {
  try {
    let cart = {}
    if (req.user) {
      cart = await createCart(true, req.user.id, false);
    } else { 
      await createCart(false, 0, false);
    }
    res.send(cart)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/removeItem/:cartId/:basketId', async (req, res) => {
  const basketId = req.params.basketId;
  const cartId = req.params.cartId;
  try {
    await removeItemFromCart(cartId, basketId);
    res.send({ message: "Item(s) of basketid deleted from cart!" });
  } catch (error) {
    console.error(error);
  }
});

router.post('/addItem/:cartId/:basketId', async (req, res, next) => {
  const basketId = req.params.basketId;
  const cartId = req.params.cartId;
  try {
    addItemToCart(cartId, basketId, 1);
    res.send({ message: "Item added to cart!" })
  } catch (error) {
    console.error(error);
  }
})

router.patch('/updateAddItem/:cartId/:basketId', async (req, res, next) => {
  const basketId = req.params.basketId;
  const cartId = req.params.cartId;
  try {
    const update = addOneItem(cartId, basketId);
    res.send({ message: 'One item updated in cart!', update })
  } catch (error) {
    console.error(error);
  }
})

router.patch('/updateRemoveItem/:cartId/:basketId', async (req, res, next) => {
  const basketId = req.params.basketId;
  const cartId = req.params.cartId;
  try {
    const update = removeOneItem(cartId, basketId);
    res.send({ message: 'One item removed from cart!', update })
  } catch (error) {
    console.error(error);
  }

})

router.patch('/updateCart', async (req, res, next) => {
  const { numberOfItems, cartId, basketId } = req.body
  try {
    const update = updateCartBaskets(numberOfItems, cartId, basketId);
    res.send({ message: "Cart updated!", update });
  } catch (error) {
    console.error(error);
  }
})

router.post('/createGuestCart', async (req, res, next) => {
  const { isLoggedIn, isPurchased } = req.body
  try {
    const newCart = createGuestCart(false, false)
    res.send({ message: "New guest cart created!", newCart })
  } catch (error) {
    console.error(error);
  }
})


module.exports = router;