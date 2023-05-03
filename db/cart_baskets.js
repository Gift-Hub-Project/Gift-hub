const client = require('./client');

const addItemToCart = async (cartId, basketId, numberOfItems) => {
  try {
    const { rows: [addItem] } = await client.query(`
      INSERT INTO cart_baskets("cartId", "basketId", "numberOfItems")
      VALUES($1, $2, $3)
      RETURNING *;
      `, [cartId, basketId, numberOfItems])
    return addItem;
  } catch (error) {
    console.error(error);
  }
}

const getCartContent = async (cartId) => {
  try {
    const { rows: getCart } = await client.query(`
      SELECT * 
      FROM cart_baskets
      WHERE "cartId"=$1
      `, [cartId])
    console.log(getCart);
    return getCart;
  } catch (error) {
    console.error(error);
  }
}

const removeItemFromCart = async (cartId, basketId) => {
  try {
    const { rows: [removeItem] } = await client.query(`
      DELETE FROM cart_baskets
      WHERE "cartId"=$1
      AND "basketId"=$2
      `, [cartId, basketId])
    return removeItem;
  } catch (error) {
    console.error(error);
  }
}

const updateCartBaskets = async (quantity, cartId, basketId) => {
  try {
    await client.query(`
        UPDATE cart_baskets
        SET "numberOfItems"=$1
        WHERE "cartId"=$2 AND "basketId"=$3;
        `, [quantity, cartId, basketId])
  } catch (error) {
    console.error(error);
  }
}

const removeOneItem = async (cartId, basketId) => {
  try {
    await client.query(`
      UPDATE cart_baskets
      SET "numberOfItems" = "numberOfItems" - 1
      WHERE "cartId"=$1 AND "basketId"=$2
      `, [cartId, basketId])
  } catch (error) {
    console.error(error);
  }

}

const addOneItem = async (cartId, basketId) => {
  try {
    await client.query(`
      UPDATE cart_baskets
      SET "numberOfItems" = "numberOfItems" + 1
      WHERE "cartId"=$1 AND "basketId"=$2
      `, [cartId, basketId])
  } catch (error) {
    console.error(error);
  }

}

module.exports = {
  removeItemFromCart,
  addItemToCart,
  updateCartBaskets,
  getCartContent,
  removeOneItem,
  addOneItem
}