const client = require ('./client.js');
const bcrypt = require ('bcrypt');

const getUser = async({username, password}) => {
  try{
    // we should use a reference here ($1) to avoid any security issues with SQL injection
    const { rows: [ user ]} = await client.query(`
    SELECT *
    FROM users
    WHERE username = '${username}'
    `)
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
    // we should use a reference here ($1) to avoid any security issues with SQL injection
    const { rows: [ user ] } = await client.query(`
    SELECT id, username
    FROM users
    WHERE id = ${userId}
    `)
    if(!user) {
      return null
    }
    return user;
  } catch(err) {
    console.error(err);
    throw err;
  }
}

const getUsernameByUsername = async ( username ) => {
  try{
    // we should use a reference here ($1) to avoid any security issues with SQL injection
    const { rows: [ user ] } = await client.query(`
    SELECT *
    FROM users
    WHERE username = ${username}
    `)
    return user;
  } catch(err) {
    console.error(err);
    throw err;
  }
}

const createUser = async ({ username, password, email, address} ) => {
  try{
    password = await bcrypt.hash(password, 10);
    // format spacing { rows: [ user ] }
    const {rows: [ user ] } = await client.query(`
    INSERT INTO users(username, password, email, address)
    VALUES($1, $2, $3, $4)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, password
      , email, address ])
      // our on conflict is working, however if we do run into a conflict here, "user" becomes undefined.
      // this ultimately will cause a typeerror below when we try to delete the password
    delete user.password;
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