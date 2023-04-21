const client = require('./client');
const { createUser } = require('./users');
const { createOccasion, getOccasionByName } = require('./occasions');

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
        "occasionId" INTEGER REFERENCES occasions(id),
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
  } catch (err) {
    console.error("ERROR CREATING USERS!")
    throw err;
  }
}

const createInitialOccasions = async () => {
  console.log("STARTING TO CREATE OCCASSIONS...");
  try {

    const occasionToCreate = [
      { name: "mom", categories: "wine" },
      { name: "wedding", categories: "champagne" },
      { name: "corporate", categories: "coffee" }
    ]
    const occasion = await Promise.all(occasionToCreate.map(createOccasion))

    console.log("Occasions created:");
    console.log(occasion);
    console.log("Finished creating occasions!");
  } catch (err) {
    console.error("ERROR CREATING OCCASIONS")
    throw err;
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
    await createInitialOccasions();
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
  rebuildTables,
  dropTables,
  createTables,
  createInitialUsers,
  createInitialOccasions,
  rebuildDb
}