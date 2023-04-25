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

const removeItemFromCart = async (id) => {

  try{
    const { rows: [ deletedItem ] } = await client.query(`
    DELETE
    FROM cart
    WHERE id=$1;
    `,[id])

  } catch(error){
    console.error(err);    
  }
}

const addItemToCart = async (items, userId) => {

  try{
     await client.query(`
    UPDATE cart 
    SET "numberOfItems" = "numberOfItems + 1
    WHERE "userId" = $1;   
    `, [userId])

    const { rows: [ addItem ] } = await clienty.query(`
    INSERT INTO cart(items, "numberOfItems")
    VALUES($1, (SELECT "numberOfItems" 
    FROM cart
    WHERE "userId" = $2))
    RETURNING *;
    `, [items, userId])

    return addItem;
  } catch(err){
    console.error(err);
  }
}

const getCartContent = async () => {

  try{
    const { rows: [ getAll ] } = await client.query(`
    SELECT * 
    FROM carts;  
   `)

   return getAll;
  } catch(err){
    console.error(err);
  }

}

module.exports = {
  addToUserCart,
  deleteFromUserCart,
  isLoggedIn,
  removeItemFromCart,
  addItemToCart,
  getCartContent
}