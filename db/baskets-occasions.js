const client = require ('./client.js');

const getBasketsByOccasionId = async({id}) =>{
    try{
        const { rows } = await client.query(`
            SELECT *
            FROM occasions_baskets
            WHERE "basketId" =$1
         `, [id]);
        return baskets;
    } catch(error){
        console.error(error);
        throw error;
    }
};

module.exports ={getBasketsByOccasionId}