const client = require('./client.js');


const getAllOccasions = async() => {
  try{
    const { rows } = await client.query(`
    SELECT id, name, categories
    FROM occasions;
    `);

    return rows
  } catch (err) {
    console.error(err);
    throw err;
  }
}
const getOccasionByName = async ( name ) => {
  try {
      const { rows: [occasion] } = await client.query(`
  SELECT *
  FROM occasions
  WHERE name = $1;
  `,[name])
      return occasion;


  } catch (err) {
      console.error(err);
      throw err;
  }
}

const getOccasionById = async (id) => {
  try {
      const { rows: [occasion] } = await client.query(`
    SELECT * FROM occasions
    WHERE id = $1;
    `, [id])
      return occasion
  } catch (err) {
      console.log(err);
  }
}




const createOccasion = async ({ name, categories }) => {
  if (!name) { return }
  try {
      const { rows: [occasion] } = await client.query(`
    INSERT INTO occasions("name", "categories")
    VALUES($1, $2)
    RETURNING *;
  `, [name, categories])
      return occasion;
  } catch (err) {
      console.log(err);
  }
}

const destroyOccasion = async (id) => {
    try {
      await client.query(`
  
        DELETE 
        FROM occasions
        WHERE id=$1;
  
    `, [id])

  
    } catch (err) {
      console.log(err);
    }
  
  }
  
  const updateOccasion = async ({ id, name, categories }) => {

    try {
  
        if(!name || !categories) { 
            throw new Error('Both fields need to be filled out to update the Occasion.') }

        const { rows: [newOccasion] } = await client.query(`
        UPDATE occasions
        SET categories=$1, name=$2
        WHERE id=$3 
        RETURNING *;
      `, [categories, name, id]);
  
        return newOccasion;
      
  
    } catch (err) {
      console.log(err);
    }
  
  }

module.exports = {
    getAllOccasions,
    getOccasionById,
    getOccasionByName,
    createOccasion,
    destroyOccasion,
    updateOccasion

}