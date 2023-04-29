const client = require ('./client.js');
const bcrypt = require ('bcrypt');

const getUser = async({username, password}) => {
  try{
    const { rows: [ user ]} = await client.query(`
    SELECT *
    FROM users
    WHERE username = $1
    `, [username])
    if(user && await bcrypt.compare(password, user.password)){
      delete user.password
      return user;
    }
    return null;
  } catch(err){
    console.error(err);
    throw err;
  }
}

const getUserById = async ( userId ) =>{
  try{
    const { rows: [ user ] } = await client.query(`
    SELECT id, username, "isAdmin"
    FROM users
    WHERE id = $1
    `, [userId])
    if(!user) {
      return null
    }
    return user;
  } catch(err) {
    console.error(err);
    throw err;
  }
}

const getUsernameByUsername = async (username) => {
  try{
    const { rows: [ user ] } = await client.query(`
    SELECT *
    FROM users
    WHERE username = $1
    `, [username])
    return user;
  } catch(err) {
    console.error(err);
    throw err;
  }
}

const createUser = async ({ username, password, email, isAdmin} ) => {
  try{
    password = await bcrypt.hash(password, 10);
    const { rows: [ user ] } = await client.query(`
    INSERT INTO users(username, password, email, "isAdmin")
    VALUES($1, $2, $3, $4)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, password
      , email, isAdmin ])

    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getUser,
  getUserById,
  getUsernameByUsername,
  createUser
}