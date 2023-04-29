const express = require('express');
// const { requireUser } =require('./utils');
const {
    createCart, 
    getCartContent,
    addItemToCart,
    removeItemFromCart

} = require('../db');
const router = express.Router();
require('dotenv').config();


//GET /api/cart   -display user cart
router.get('/:cartId', async (req, res) => {
    const { cartId } =req.params;
    try {
        const content = await getCartContent(cartId); 
        res.send({ message: "Fetched items in cart.", content }); 
    } catch (error) {
        console.log(error)
    }
});
//post /api/userscart route to create a new cart
router.post('/', async (req,res) => {
    try {
        let cart = {}
        if(req.user) {
            cart = await createCart(true, req.user.id, false);
        } else { //we need logic for guest cart, no userId on a guest
            await createCart(false, 0 , false);
        }   
        res.send(cart)

    } catch (error) {
        console.error(error)
    }
})

//PATCH/api/cart/item   -add item to cart, update number of items
router.patch('/:basketId', async (req, res, next) => {
  const { basketId } = req.params;
  const { cartId, numberOfItems } = req.body;

  try {
    await addItemToCart(cartId, basketId, numberOfItems)
    res.send({ message: "Item added to cart!" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//PATCH/api/cart    -empty cart after purchase
router.patch('/', async (req, res, next) => {
  let { items, numberOfItems } = req.body

  try {
    if (items != 0 && numberOfItems != 0) {
      items = 0
      numberOfItems = 0
      const deleteAll = await deleteFromUserCart()
      res.send({ message: "Cart is now Empty.", deleteAll })
    } else {
      res.send({ message: "Cart " })
    }
  } catch (error) {
    next(error);
  }
})

// DELETE/api/cart - delete item from cart
router.delete('/:cartId/:basketId', async (req, res, next) => {
    const { cartId, basketId } = req.params;
  
    try {
      await removeItemFromCart(cartId, basketId);
      res.send({ message: "Item deleted from cart." });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  

// router.delete('/:items', async (req, res, next) => {
//   const { items } = req.params

//   try {
//     await removeItemFromCart(cartId, basketId);
//     res.send({ message: "Item deleted from cart." })
//     if (items.length === 0) {
//       res.send({ message: "No item to delete." });
//     }
//   } catch (error) {
//     console.error(error);
//     next(error)
//   }
// })


module.exports = router;