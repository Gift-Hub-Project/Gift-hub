const client = require('./client');

const addItemToCart = async ( cartId, basketId, numberOfItems ) => {
    try{
      const { rows: [ addItem ] } = await client.query(`
      INSERT INTO cart_baskets("cartId", "basketId", "numberOfItems")
      VALUES($1, $2, $3)
      RETURNING *;
      `, [cartId, basketId, numberOfItems])
  
      return addItem;
    } catch(err){
      console.error(err);
    }
  }

  const getCartContent = async (cartId) => {
    try{
      const { rows: getCart } = await client.query(`
      SELECT * 
      FROM cart_baskets
      WHERE "cartId"=$1
      `, [cartId])
  console.log(getCart);
     return getCart;
    } catch(err){
      console.error(err);
    }
  
  }

const removeItemFromCart = async ( cartId, basketId ) => {

          try{  
      const { rows: [ removeItem ] } = await client.query(`
      DELETE FROM cart_baskets
      WHERE "cartId"=$1
      AND "basketId"=$2
      `, [cartId, basketId])
  
      return removeItem;
    } catch(err){
      console.error(err);
    }
  }

  const updateCart = async (cartId, basketId, quantity) => {

    try{
        await client.query(`
        UPDATE cart_baskets
        SET "numberOfItems"=$1
        WHERE "cartId"=$2 AND "basketId"=$3;
        `,[quantity, cartId, basketId])

    } catch(err){
        console.error(err);
    }
  }

  module.exports = {
    removeItemFromCart, //works
    addItemToCart, //works
    updateCart, //works
    getCartContent, //works

  }
