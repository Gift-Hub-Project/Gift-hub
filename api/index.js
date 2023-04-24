const express = require('express');
const { getUsernameByUsername } = require('../db/users');
const router = require('./users');
const apiRouter = express.Router();

const { JWT_SECRET } = process.env;

apiRouter.use(express.json());

apiRouter.use(async(req, res, next)=>{
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if(!auth){
      next();
    }else if(auth.startsWith(prefix)){
      const token = auth.slice(prefix.length);
      try{
        const { id } = jwt.verify(token, JWT_SECRET);
        if(id){
          req.user = await getUsernameByUsername(id);
          next();
        }
      }catch({name, message}){
        next({name, message});
      }
    }else{
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      })
    }
  })

apiRouter.use('/users', router);

module.exports = {
    apiRouter
};