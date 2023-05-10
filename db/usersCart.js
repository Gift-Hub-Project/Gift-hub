const client = require('./client');

const createCart = async (
  isLoggedIn,
  userId,
  isPurchased
) => {
  try {
    const { rows: [usersCart] } = await client.query(`
    INSERT INTO cart("isLoggedIn", "userId", "isPurchased")
    VALUES($1, $2, $3)
    RETURNING *;
    `, [isLoggedIn, userId, isPurchased]);
    return usersCart;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const updateCart = async (cartId) => {
  try {
    await client.query(`
  UPDATE cart
  SET "isPurchased"=true;
  WHERE "cartId"=$1
  RETURNING *;
  `, [cartId]);
    return;
  } catch (error) {
    console.error(error);
  }
}

const getAllCarts = async (isPurchased, userId) => {
  try {
    const { rows: allPurchasedCarts } = await client.query(`
    SELECT * 
    FROM cart
    WHERE "userId"=$1 
    AND "isPurchased"=$2 
    RETURNING *;
    ` [userId, isPurchased])

    return allPurchasedCarts
  } catch (error) {
    console.error(error);
  }
}

const getCartById = async (userId) => {
  try {
    const { rows: [cart] } = await client.query(`
    SELECT *
    FROM cart
    WHERE "userId"=$1;
    `, [userId])
    return cart;
  } catch (error) {
    console.error(error);
  }
}

const createGuestCart = async (
  isLoggedIn,
  isPurchased
) => {
  try {
    const { rows: [usersCart] } = await client.query(`
    INSERT INTO cart("isLoggedIn", "isPurchased")
    VALUES($1, $2)
    RETURNING *;
    `, [isLoggedIn, isPurchased]);

    return usersCart;
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  createCart,
  updateCart,
  getCartById,
  getAllCarts,
  createGuestCart
}