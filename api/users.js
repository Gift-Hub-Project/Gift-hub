const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUser, getUserByUsername } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bodyParser = require('body-parser');
const { response } = require('express');
const { requireUser } = require('./utils.js');


router.use(bodyParser.json());

router.post('/', async(req, res, next) => {
  const output = {
    success: false,
    error: null,
    user: null,
    token: null
  }

  try{
    console.log
    const user = await getUser(req.body);
    if(!user){
      output.error = "User of that combo does not exist";
    }
    else{
      output.user = user;
      output.success = true;
      const token = jwt.sign({
        username: user.username,
        id: user.id
      }, process.env.JWT_SECRET);
      output.token = token
    }    
    res.send(output)
  }catch(err){
    output.error = err;
    res.send(output)
  }
});

router.post('/register', async(req, res, next ) => {
  const output ={
    success: false,
    error: null,
    user: null,
    token: null,
  }
  try{
    const user = await createUser(...Object.values(req.body));
    if(!user){
      output.error = "User Already Exists";
    }
    else{
      output.user = user;
      output.success = true;
      const token = jwt.sign({
        username: user.username,
        id: user.id
      }, process.env.JWT_SECRET);
      output.token = token
    }
    
    res.send(output)
  }catch(err){
    output.error = err;
    res.send(output)
  }
});

router.get('/myaccount', requireUser, async(req, res, next) => {
  try{
    res.send(req.user)
  } catch (error) {
    console.error(error);
  }
})
    
module.exports = router;
 