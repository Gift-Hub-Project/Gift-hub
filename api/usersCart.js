const express = require('express');
const { requireUser } = require('./utils');
const { createCart, createGuestCart } = require('../db/usersCart');
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


//GET /api/usersCart/:cartId   -display user cart content
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

//POST /api/userscart/ route to create a new cart
router.post('/', requireUser, async (req, res) => {
  try {
    let cart = {}
    if (req.user) {
      cart = await createCart(true, req.user.id, false);
    } else { //we need logic for guest cart, no userId on a guest
      await createCart(false, 0, false);
    }
    res.send(cart)
  } catch (error) {
    console.error(error)
  }
})

//DELETE /api/usersCart/removeItem - removes item from cart
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

//POST /api/usersCart/addItem - adds item to cart
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

//PATCH /api/usersCart/updateItem - adds item in existing cart
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

//PATCH /api/usersCart/updateItem - removes item in existing cart
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

//PATCH /api/usersCart/updateCart -updates all columns
router.patch('/updateCart', async (req, res, next) => {
  const { numberOfItems, cartId, basketId } = req.body
  try {
    const update = updateCartBaskets(numberOfItems, cartId, basketId);
    res.send({ message: "Cart updated!", update });
  } catch (error) {
    console.error(error);
  }
})

//POST /api/usersCart/createNewCart - create cart for guest user (no userId)
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