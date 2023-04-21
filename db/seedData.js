const client = require('./client');
const { createUser } = require('./users');

const dropTables = async () => {
  try {
    console.log("DROPPING ALL TABLES...")
    await client.query(`
  DROP TABLE IF EXISTS baskets;
  DROP TABLE IF EXISTS occasions;
  DROP TABLE IF EXISTS cart;
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
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        items VARCHAR(255),
        "numberOfItems" INTEGER DEFAULT '0',
        "isLoggedIn" BOOLEAN DEFAULT false,
        "userId" INTEGER REFERENCES users(id),
        "isPurchased" BOOLEAN DEFAULT false
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
        "occasionsId" INTEGER REFERENCES occasions(id),
        quantity INTEGER DEFAULT '0',
        price FLOAT
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
      { username: "mike", password: "mike22", address: "Next to Wendy's dumpster", email: "mike@behindwendys.com" },
      { username: "alice", password: "alicat7", address: "wonderland", email: "alice@wonderland.com" },
      { username: "bob", password: "bobert007", address: "County lock up", email: "bob@cell4.com" },
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch(err) {
    console.error("ERROR CREATING USERS!")
    throw err;
  }
}

const createInitialCart = async () => {
  console.log("STARTING TO CREATE CART...")
  try {
    const CartToCreate = [
      { items: "1", quantity: "1", userId: "1", isPurchased: false },
      { items: "2", quantity: "2", userId: "2", isPurchased: false },
      { items: "3", quantity: "3", userId: "3", isPurchased: false },
    ]
    const cart = await Promise.all(CartToCreate.map(createCart))

    console.log("Cart created:")
    console.log(cart)
    console.log("Finished creating Cart!")
  } catch(err) {
    console.error("ERROR CREATING CART!")
    throw err;
  }
}

const createOccasions = async () => {
  console.log("STARTING TO CREATE CART...")
  try {
    const OccasionToCreate = [
      { name: "For Mom", categories: ["gardening", "cooking", "self-care", "shopping", "wine"]  },
      { name: "For Mom", categories: ["grilling", "golfing", "self-care", "bourban", "sports"]  },
      { name: "Wedding", categories: ["bridesmaides", "groomsmen", "champagne", "for him", "for her"] },
    ]
    const cart = await Promise.all(OccasionToCreate.map(createCart))

    console.log("Occasion created:")
    console.log(occasion)
    console.log("Finished creating Occasion!")
  } catch(err) {
    console.error("ERROR CREATING OCCASION!")
    throw err;
  }
}

const createBaskets = async () => {
  console.log("STARTING TO CREATE BASKETS...")
  try {
    const basketsToCreate = [
      { name: "Gardening Basket", description: "a basket to fulfill all of your moms gardening dreams", price: "50" },
      { name: "Grilling Basket", description: "a basket to fulfill all of your dads grilling dreams", price: "60"  },
      { name: "Champagne Basket", description: "a basket to fulfill your bridal party's bubbly dreams", price: "75"  },
    ]
    const basket = await Promise.all(basketsToCreate.map(createBasket))

    console.log("Basket created:")
    console.log(basket);
    console.log("Finished creating Basket!")
  } catch(err) {
    console.error("ERROR CREATING BASKET!")
    throw err;
  }
}

const rebuildTables = async() =>{
	console.log("DROPPING TABLES");
	await dropTables();
	console.log('FINISHED DROPPING TABLES');
	console.log('BUILDING TABLES');
	await createTables();
	console.log('FINISHED BUILDING TABLES');
  
};

const rebuildDb = async() =>{
  try {
    await testDb();
  await rebuildTables();
  await createInitialUsers();
  await createInitialCart();
  await createOccasions();
  await createBaskets()
  } catch(err){
    console.log(err);
  }
}



const testDb = async () =>{
  console.log("CONNECTING TO DB...");
  client.connect();
  console.log("FINISHED CONNECTING");
};



module.exports = {
  rebuildTables,
  dropTables,
  createTables,
  createInitialUsers,
  createInitialCart,
  createOccasions,
  createBaskets,
  rebuildDb
}