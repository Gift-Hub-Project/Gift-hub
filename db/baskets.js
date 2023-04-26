const client = require ('./client.js');

const createBasket = async({name, description, occasionId,  quantity, price}) =>{
    try{
        const { rows: [ baskets ]} = await client.query(`
        INSERT INTO baskets(name, description, "occasionId", quantity, price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `, [name, description, occasionId, quantity, price]);
        return baskets

    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllBaskets = async() =>{
    try{
        const { rows } = await client.query(`
            SELECT *
            FROM baskets
        `);
        return rows;
    } catch(error){
        console.error(error);
        throw error;
    }
};

const getBasketById = async (id) =>{
    try{
        const { rows:[ baskets ]} = await client.query(`
            SELECT *
            FROM baskets
            WHERE id = $1
        `,[id]);
        return baskets
    } catch(error){
        console.error(error);
        throw error;
    }
};

const getBasketByName = async(name) =>{
    try{
        const { rows:[ baskets ] } = await client.query(`
            SELECT *
            FROM baskets
            WHERE name = $1
        `,[name]);
        return baskets;
    } catch(error){
        console.error(error);
        throw error;
    }
};

const updateBasket = async({id, ...fields}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}" = $${index+1}`
    ).join(', ');
        if(!setString.length)
 {
    return
 }
     try{
        const { rows: [ baskets ]} = await client.query(`
            UPDATE baskets
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `, Object.values(fields));
        return baskets;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const destroyBasket = async(id) => {
    try{
        await client.query(`
            DELETE FROM baskets
            WHERE "basketId" = ${id}
            RETURNING *
        `)
        return id;
    } catch(error){
        console.error(error);
        throw error;
    }
};

module.exports = {
    createBasket,
    getAllBaskets,
    getBasketById,
    getBasketByName,
    updateBasket,
    destroyBasket
};