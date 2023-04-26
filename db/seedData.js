const client = require('./client');
const { createUser } = require('./users');

const { createOccasion} = require('./occasions');
const { createBasket } = require('./baskets');
const { addToUserCart } = require('./usersCart');

const dropTables = async () => {
  try {
    console.log("DROPPING ALL TABLES...")
    await client.query(`
  DROP TABLE IF EXISTS cart_baskets;
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS occasions_baskets;
  DROP TABLE IF EXISTS baskets;
  DROP TABLE IF EXISTS occasions;
  DROP TABLE IF EXISTS users;
  `); console.log("FINISHED DROPPING TABLES")
  } catch (err) {
    throw err;
  }
}

const createTables = async () => {
  try {
    console.log("STARTING TO BUILD TABLES...")
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isLoggedIn" BOOLEAN DEFAULT false,
        "isAdmin" BOOLEAN DEFAULT false,
        cart BOOLEAN DEFAULT false,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
       );
      CREATE TABLE occasions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        categories VARCHAR(255)
        );
      CREATE TABLE baskets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        "occasionId" INTEGER REFERENCES occasions(id),
        quantity INTEGER DEFAULT '0',
        price FLOAT
        );
      CREATE TABLE occasions_baskets (
        id SERIAL PRIMARY KEY,
        "occasionsId" INT REFERENCES occasions(id),
        "basketId" INT REFERENCES baskets(id)
        );
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        items INTEGER REFERENCES baskets(id),
        "numberOfItems" INTEGER DEFAULT 0,
        "isLoggedIn" BOOLEAN DEFAULT false,
        "userId" INTEGER REFERENCES users(id),
        "isPurchased" BOOLEAN DEFAULT false
         );
      CREATE TABLE cart_baskets( 
        id SERIAL PRIMARY KEY,
        "cartId" INT REFERENCES cart(id),
        "basketId" INT REFERENCES baskets(id),
        UNIQUE ("cartId", "basketId")
          );

      `);
    console.log("FINISHED MAKING TABLES!")
  } catch (err) {
    console.log("ERROR MAKING TABLES!")
    throw err;
  }
};

const createInitialUsers = async () => {
  console.log("STARTING TO CREATE USERS...")
  try {
    const usersToCreate = [
      { username: "mike", password: "mike22", address: "Next to Wendy's dumpster", email: "mike@behindwendys.com", isAdmin: true },
      { username: "alice", password: "alicat7", address: "wonderland", email: "alice@wonderland.com", isAdmin: false },
      { username: "bob", password: "bobert007", address: "County lock up", email: "bob@cell4.com", isAdmin: false },
    ]
    const users = await Promise.all(usersToCreate.map(createUser))



    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (err) {
    console.error("ERROR CREATING USERS!")
    throw err;
  }
}


const createInitialCart = async () => {
  console.log("STARTING TO CREATE CART...")
  try {
    const cartToCreate = [
      { items: 1, numberOfItems: 1, isLoggedIn: true, userId: 1, isPurchased: false },
      { items: 2, numberOfItems: 2, isLoggedIn: true, userId: 2, isPurchased: false },
      { items: 3, numberOfItems: 3, isLoggedIn: true, userId: 3, isPurchased: true },
    ]
    const cart = await Promise.all(cartToCreate.map((value) => {

      return addToUserCart(value.items,
        value.numberOfItems,
        value.isLoggedIn,
        value.userId,
        value.isPurchased
      )
    }))

    console.log("Cart created:")
    console.log(cart)
    console.log("Finished creating Cart!")
  } catch (err) {
    console.error("ERROR CREATING CART!")
    throw err;
  }
}

const createOccasions = async () => {
  console.log("STARTING TO CREATE CART...")
  try {
    const OccasionToCreate = [
      { name: "For Mom", categories: ["gardening", "cooking", "self-care", "shopping", "wine"] },
      { name: "For Dad", categories: ["grilling", "golfing", "self-care", "bourban", "sports"] },
      { name: "Wedding", categories: ["bridesmaides", "groomsmen", "champagne", "for him", "for her"] },
    ]
    const occasion = await Promise.all(OccasionToCreate.map(createOccasion))

    console.log("Occasion created:")
    console.log(occasion)
    console.log("Finished creating Occasion!")
  } catch (err) {
    console.error("ERROR CREATING OCCASION!");
    throw err;
  }
}


const createBaskets = async () => {
  console.log("STARTING TO CREATE BASKETS...")
  try {
    const basketsToCreate = [
      { name: "Gardening Basket", description: "a basket to fulfill all of your moms gardening dreams", occasionId: 1, quantity: 1, price: 50 },
      { name: "Grilling Basket", description: "a basket to fulfill all of your dads grilling dreams", occasionId: 1, quantity: 1, price: 60 },
      { name: "Champagne Basket", description: "a basket to fulfill your bridal party's bubbly dreams", occasionId: 1, quantity: 1, price: 75 }
    ]
    const basket = await Promise.all(basketsToCreate.map(createBasket))

    console.log("Basket created:")
    console.log(basket);
    console.log("Finished creating Basket!")
  } catch (err) {
    console.error("ERROR CREATING BASKET!")
    throw err;
  }
}

const createInitialCartBasketIds = async () => {
  console.log("STARTING TO CREATE CART_BASKETS ID TABLE");
try {
  const cartBasketIdsToCreate = [
    { occasionId: 1, basketId: 2 },
    { occasionId: 3, basketId: 1 },
    { occasionId: 2, basketId: 3 },
  ]
  const cartBasket = await Promise.all(cartBasketIdsToCreate.map(createInitialCartBasketId))

  console.log('CART_BASKETS table ids created:');
  console.log(cartBasket);
  console.log("Finished creating CART_BASKETS Id table!");
} catch(err) {
  console.error("ERROR CREATING CART_BASKETS ID")
}

}

const rebuildTables = async () => {
  console.log("DROPPING TABLES");
  await dropTables();
  console.log('FINISHED DROPPING TABLES');
  console.log('BUILDING TABLES');
  await createTables();
  console.log('FINISHED BUILDING TABLES');
};

const rebuildDb = async () => {
  try {
    await testDb();
    await rebuildTables();
    await createInitialUsers();
    await createOccasions();
    await createBaskets();
    await createInitialCart();
    await createInitialCartBasketIds();
  } catch (err) {
    console.log(err);
  }
}



const testDb = async () => {
  console.log("CONNECTING TO DB...");
  client.connect();
  console.log("FINISHED CONNECTING");
};



module.exports = {
  rebuildDb
}