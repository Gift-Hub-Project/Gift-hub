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

const deleteFromUserCart = async () => {
 try {
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

const isLoggedIn = async () => {

}

module.exports = {
  addToUserCart,
  deleteFromUserCart,
  isLoggedIn
}