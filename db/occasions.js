const client = require('./client.js');


const getOccasionByName = async ({ name }) => {
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

module.exports = {
  getOccasionById,
  getOccasionByName,
  createOccasion
}