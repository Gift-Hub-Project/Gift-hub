const client = require('./client');

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
    throw err
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

const rebuildTables = async() =>{
	console.log("DROPPING TABLES");
	await dropTables();
	console.log('FINISHED DROPPING TABLES');
	console.log('BUILDING TABLES');
	await createTables();
	console.log('FINISHED BUILDING TABLES')
};

module.exports = {
  rebuildTables,
  dropTables,
  createTables
}