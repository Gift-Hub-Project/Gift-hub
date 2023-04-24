const client = require('./client');

const addToUserCart = async (
  items,
  numberOfItems,
  isLoggedIn,
  userId,
  isPurchased
) => {
  try {
    const { rows: [ usersCart ] } = await client.query(`
    INSERT INTO cart(items, "numberOfItems", "isLoggedIn", "userId", "isPurchased")
    VALUES($1, $2, $3, $4, $5)

    RETURNING *;
    `, [items, numberOfItems, isLoggedIn, userId, isPurchased ]);

    return usersCart;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const deleteFromUserCart = async () => { // formatting inside this function
 try {
  // based on our naming convention, is this intended to delete a certain users cart? If so, currently this deletes every cart in our database that has an isPurchased to be true. It's fine to keep cart's that have isPurchased = true in general, as this let's us have an "order history"
  await client.query(`
  DELETE FROM cart WHERE "isPurchased" = true
  RETURNING *;
  `);

  return;
 }catch (error) {
  console.error(err);
  throw err;
 }
}
// This doesn't interface with the cart table at all, so it feels as though it should exist in the users.js file instead
const isLoggedIn = async () => {
  try {
    const {rows: [ usersCart ] } = await client.query(`
    SELECT *
    FROM users
    WHERE "isLoggedIn" = true
    `)
  } catch (error){
    console.error(err);
    throw error;
  }
}

module.exports = {
  addToUserCart,
  deleteFromUserCart,
  isLoggedIn
}