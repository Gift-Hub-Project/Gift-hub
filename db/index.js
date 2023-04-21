// module.exports = {
//     ...require('./baskets'),
//     ...require('./users'),
//     ...require('./occasions'),
//     ...require('./cart')
// };

const getUser = require('./getUser');
const getUserById = require('./getUserById');
const getUsernameByUsername = require('./getUsernameByUsername');
const createUser = require('./createUser');
const createBaskets = require('./createBaskets');
const getAllBaskets = require('./getAllBaskets');
const getBasketsById = require('./getBasketsById');
const getBasketsByName = require('./getBasketsByName');
const getBasketsByOccasionId = require('./getBasketsByOccasionId');
const attachBasketsToOccasions = require('./attachBasketsToOccasions');
const updateBasket = require('./updateBasket');
const destroyBasket = require('./destroyBasket');


module.exports = {
    getUser,
    getUserById,
    getUsernameByUsername,
    createUser,
    createBaskets,
    getAllBaskets,
    getBasketsById,
    getBasketsByName,
    getBasketsByOccasionId,
    attachBasketsToOccasions,
    updateBasket,
    destroyBasket

}