const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUser, getUserByUsername } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

userRouter.post('/login', async(req, res, next) => {
  const output = {
    success: false,
    error: null,
    user: null,
    token: null
  }

  try{
    const user = await getUser(...Object.values(req.body));
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
})

userRouter.post('/register', async(req, res, next ) => {
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
    
module.exports = router;
 