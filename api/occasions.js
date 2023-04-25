const express = require('express');
const { getOccasionByName, createOccasion } = require('../db/occasions');
const router = express.Router();
const { adminToken } = require('utils.js');

//GET /api/occasions
router.get('/', async(req, res, next) => {
  try{
    const occasions = await getOccasionByName();
    res.send(occasions);
  }catch(err){
   next(err);
  }
})
//POST /api/occasions
router.post('/', adminToken, async(req, res, next) => {
  try{
   const userId = req.body.userId
   const isAdmin = userIsAdmin(userId)
   if(!isAdmin) {
    res.status(401).send({
      "error": 'UnauthorizedError',
      "message": "You are not authorized to perform this action",
      "name": `UnauthorizedError`
    })
   } else {
     const newOccasion = req.body;
     const createdOccasion = await createOccasion(newOccasion);
     res.send(createdOccasion)
   }
  }catch(err){
   next(err);
  }
});
//PATCH /api/occasions/:occasionsId
router.patch('/:ocassionsId', async(req, res, next) =>{

})
//DELETE /api/occasions/:occasionsId
router.delete('/:routineId', async(req, res, next) => {

})
module.exports = router;