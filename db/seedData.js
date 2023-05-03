const client = require('./client');
const { createUser } = require('./users');
const { createOccasion} = require('./occasions');
const { createBasket } = require('./baskets');
const { createCart } = require('./usersCart');
const { addItemToCart } = require('./cart_baskets');
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
  try { //moved numberof items to cart_basket, 
    console.log("STARTING TO BUILD TABLES...")
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isLoggedIn" BOOLEAN DEFAULT false,
        "isAdmin" BOOLEAN DEFAULT false,
        cart BOOLEAN DEFAULT false,
        address VARCHAR(255),
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
          "isLoggedIn" BOOLEAN DEFAULT false,
          "userId" INTEGER REFERENCES users(id),
          "isPurchased" BOOLEAN DEFAULT false
          );
        CREATE TABLE cart_baskets( 
            id SERIAL PRIMARY KEY,
            "numberOfItems" INTEGER DEFAULT 0,
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
      { isLoggedIn: true, userId: 1, isPurchased: false },
      { isLoggedIn: true, userId: 2, isPurchased: false },
      { isLoggedIn: true, userId: 3, isPurchased: true },
    ]
    const cart = await Promise.all(cartToCreate.map((value) => {

      return createCart( 
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
      { name: "For Dad", categories: ["grilling", "golfing", "self-care", "bourbon", "sports"] },
      { name: "Wedding", categories: ["bridesmaides", "groomsmen", "champagne", "for him", "for her"] },
      { name: "Baby", categories: ["diaper cake", "plush", "disney", "baby boy", "baby girl"] },
      { name: "Teen Boy", categories: ["entertainment", "anime", "sports", "gamer", "self-care"] },
      { name: "Teen Girl", categories: ["sports", "self-care", "entertainment", "mindfulness", "anime"] },
      { name: "Corporate", categories: ["retirement", "thank you", "promotion", "downsizing:(", "coffee"] },
      { name: "Grief", categories: ["mindfulness", "self-care", "comfort food", "plush", "rainbow bridge"] },
      { name: "Graduation", categories: ["highschool", "college", "progressive", "treats and snacks", "coffee"] },


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
      { name: "Mom's Gardening Basket", description: "a basket to fulfill all of your moms gardening dreams", occasionId: 1, quantity: 1, price: 50 },
      { name: "Mom's Cooking Basket", description: "a basket to fulfill all of your Mom's Cooking dreams", occasionId: 1, quantity: 1, price: 60 },
      { name: "Mom's Self-Care Basket", description: "a basket to fulfill your Mom's Self Care dreams", occasionId: 1, quantity: 1, price: 75 },
      { name: "Mom's Shopping Basket", description: "a basket to fulfill all of your Mom's Shopping dreams", occasionId: 1, quantity: 1, price: 50 },
      { name: "Mom's Wine Basket", description: "a basket to fulfill all of your Mom's Wine dreams", occasionId: 1, quantity: 1, price: 60 },
      { name: "Dad's Grilling Basket", description: "a basket to fulfill your Dad's Grilling dreams", occasionId: 2, quantity: 1, price: 75 },
      { name: "Dad's Golfing Basket", description: "a basket to fulfill all of your Dad's Golfing dreams", occasionId: 2, quantity: 1, price: 50 },
      { name: "Dad's Self-Care Basket", description: "a basket to fulfill all of your Dad's Self-Care dreams", occasionId: 2, quantity: 1, price: 60 },
      { name: "Dad's Bourbon Basket", description: "a basket to fulfill your Dad's Bourbon dreams", occasionId: 2, quantity: 1, price: 75 },
      { name: "Dad's Sports Basket", description: "a basket to fulfill all of your Dad's Athetic dreams", occasionId: 2, quantity: 1, price: 60 },
      { name: "Wedding-Bridesmaids Basket", description: "a basket to fulfill all of your Bridesmaid's wedding dreams", occasionId: 3, quantity: 1, price: 60 },
      { name: "Wedding-Groomsmen  Basket", description: "a basket to fulfill all of your Groomsmen's wedding dreams", occasionId: 3, quantity: 1, price: 60 },
      { name: "Wedding-Champagne Basket", description: "a basket to fulfill all of your bubbly wedding dreams", occasionId: 3, quantity: 1, price: 60 },
      { name: "Wedding-For Him  Basket", description: "a basket to fulfill all of your Groom's wedding dreams", occasionId: 3, quantity: 1, price: 60 },
      { name: "Wedding-For Her  Basket", description: "a basket to fulfill all of your Bride's wedding dreams", occasionId: 3, quantity: 1, price: 60 },
      { name: "Baby-Diaper Cake Basket", description: "a basket to fulfill all of your diaper cake dreams", occasionId: 4, quantity: 1, price: 60 },
      { name: "Baby-Plush  Basket", description: "a basket to fulfill all of your baby plush dreams", occasionId: 4, quantity: 1, price: 60 },
      { name: "Baby-Disney  Basket", description: "a basket to fulfill all of your baby disney dreams", occasionId: 4, quantity: 1, price: 60 },
      { name: "Baby-Baby Boy  Basket", description: "a basket to fulfill all of your baby boy dreams", occasionId: 4, quantity: 1, price: 60 },
      { name: "Baby-Baby Girl  Basket", description: "a basket to fulfill all of your baby girl dreams", occasionId: 4, quantity: 1, price: 60 },
      { name: "Teen Boy-Entertainment  Basket", description: "a basket to fulfill all of your teen boy entertainment dreams", occasionId: 5, quantity: 1, price: 60 },
      { name: "Teen Boy-Anime Basket", description: "a basket to fulfill all of your teen boy anime dreams", occasionId: 5, quantity: 1, price: 60 },
      { name: "Teen Boy-Sports  Basket", description: "a basket to fulfill all of your teen boy sports dreams", occasionId: 5, quantity: 1, price: 60 },
      { name: "Teen Boy-Gamer  Basket", description: "a basket to fulfill all of your teen boy gamer dreams", occasionId: 5, quantity: 1, price: 60 },
      { name: "Teen Boy-Self-Care  Basket", description: "a basket to fulfill all of your teen boy self-care dreams", occasionId: 5, quantity: 1, price: 60 },
      { name: "Teen Girl-Sports  Basket", description: "a basket to fulfill all of your teen girl sports dreams", occasionId: 6, quantity: 1, price: 60 },
      { name: "Teen Girl-Self-Care  Basket", description: "a basket to fulfill all of your teen girl self-care dreams", occasionId: 6, quantity: 1, price: 60 },
      { name: "Teen Girl-Entertainment  Basket", description: "a basket to fulfill all of your teen gitl entertainment dreams", occasionId: 6, quantity: 1, price: 60 },
      { name: "Teen Girl-Mindfulness  Basket", description: "a basket to fulfill all of your teen girl mindfulness dreams", occasionId: 6, quantity: 1, price: 60 },
      { name: "Teen Girl-Anime  Basket", description: "a basket to fulfill all of your teen girl anime dreams", occasionId: 6, quantity: 1, price: 60 },
      { name: "Corporate-Retirement  Basket", description: "a basket to fulfill all of your corporate retirement dreams", occasionId: 7, quantity: 1, price: 60 },
      { name: "Corporate-Thank You  Basket", description: "a basket to fulfill all of your corporate thank you dreams", occasionId: 7, quantity: 1, price: 60 },
      { name: "Corporate-Promotion  Basket", description: "a basket to fulfill all of your corporate promotion dreams", occasionId: 7, quantity: 1, price: 60 },
      { name: "Corporate-Downsizing:( Basket", description: "a basket to fulfill all of your downsizing comfort needs", occasionId: 7, quantity: 1, price: 60 },
      { name: "Corporate-Coffee  Basket", description: "a basket to fulfill all of your corporate coffee dreams", occasionId: 7, quantity: 1, price: 60 },
      { name: "Grief-Mindfulness  Basket", description: "a basket to fulfill all of your greif mindfulness needs", occasionId: 8, quantity: 1, price: 60 },
      { name: "Grief-Self-Care  Basket", description: "a basket to fulfill all of your grief self-care needs", occasionId: 8, quantity: 1, price: 60 },
      { name: "Grief-Comfort Food  Basket", description: "a basket to fulfill all of your grief comfort food needs", occasionId: 8, quantity: 1, price: 60 },
      { name: "Grief-Plush  Basket", description: "a basket to fulfill all of your grief plush needs", occasionId: 8, quantity: 1, price: 60 },
      { name: "Grief- Rainbow Bridge Basket", description: "a basket to fulfill all of your grief rainbow bridge needs", occasionId: 8, quantity: 1, price: 60 },
      { name: "Graduation-Highschool  Basket", description: "a basket to fulfill all of highschool graduation dreams", occasionId: 9, quantity: 1, price: 60 },
      { name: "Graduation-College Basket", description: "a basket to fulfill all of your college graduation dreams", occasionId: 9, quantity: 1, price: 60 },
      { name: "Graduation-Progressive  Basket", description: "a basket to fulfill all of your progressive graduation dreams", occasionId: 9, quantity: 1, price: 60 },
      { name: "Graduation-Treats and Snacks  Basket", description: "a basket to fulfill all of your graduation treats and snacks dreams", occasionId: 9, quantity: 1, price: 60 },
      { name: "Graduation-Coffee  Basket", description: "a basket to fulfill all of your graduation coffee dreams", occasionId: 9, quantity: 1, price: 60 },

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
      { cartId: 1, basketId: 2, numberOfItems: 2 },
      { cartId: 1, basketId: 1, numberOfItems: 2 }, 
      { cartId: 1, basketId: 3, numberOfItems: 2 }, 
      { cartId: 3, basketId: 1, numberOfItems: 2 },
      { cartId: 2, basketId: 3, numberOfItems: 1 },
    ]

  const cartBasket = await Promise.all(cartBasketIdsToCreate.map(value => {
    return addItemToCart(
      value.cartId, 
      value.basketId,
      value.numberOfItems
    )
  }));
  console.log('CART_BASKETS table ids created:');
  console.log(cartBasket);
  console.log("Finished creating CART_BASKETS Id table!");

} catch(err) {
  console.error("ERROR CREATING CART_BASKETS ID", err)
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