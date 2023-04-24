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
// id is unused, we can remove it
const getAllBaskets = async(id) =>{
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

const getBasketById = async(id) =>{
    try{
    // we should use a prepared statement here ($1) to avoid any security issues with SQL injection
        const { rows:[ baskets ]} = await client.query(`
            SELECT *
            FROM baskets
            WHERE id = ${id}
        `);
        return baskets
    } catch(error){
        console.error(error);
        throw error;
    }
};

const getBasketByName = async(name) =>{
    try{
    // we should use a reference here ($1) to avoid any security issues with SQL injection
        const { rows:[ baskets ] } = await client.query(`
            SELECT *
            FROM baskets
            WHERE name = ${name}
        `);
        return baskets;
    } catch(error){
        console.error(error);
        throw error;
    }
};

const getBasketsByOccasionId = async({id}) =>{
    try{
        // we have this statement a bit flipped around/backwards, remember that the INTEGER REFERENCE is in the baskets table (baskets."occasionId")
        const { rows } = await client.query(`
            SELECT baskets.*, occasions.name, occasions.categories
            FROM occasions
            JOIN baskets
                ON occasions."basketId" = baskets.id
            WHERE occasions."occasionId" = $1
        `, [id]);
        // not returning any data
    } catch(error){
        console.error(error);
        throw error;
    }
};

// what is our goal with this function, what are we trying to accomplish?
const attachBasketsToOccasions = async (occasions) => {
    try {
    // we should use a reference here ($1) to avoid any security issues with SQL injection
        for (let i = 0; i< occasions.length; i++){
            const {rows: baskets} = await client.query(`
                SELECT baskets.*, occasions.name, occasions.categories
                FROM occasions
                JOIN baskets
                    ON occasions."basketId" = baskets.id
                WHERE occasions."occasionId" = ${occasions[i].id}
            `)
            occasions[i].baskets = baskets;
        } 
        // not returning any data
    } catch (error){
        console.error(error);
        throw error
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
        // if we're just returning the id at the end of this statement (line 130), we don't need to return anything from our sql (line 128)
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
    getBasketsByOccasionId,
    attachBasketsToOccasions,
    updateBasket,
    destroyBasket
};