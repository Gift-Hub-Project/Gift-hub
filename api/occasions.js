const express = require('express');
const { 
  getOccasionByName, 
  createOccasion,
  updateOccasion,
  destroyOccasion,
  getAllOccasions
} = require('../db/occasions');
const { adminToken } = require('./utils');
const router = express.Router();

//GET /api/occasions
router.get('/', async(req, res, next) => {
  try{
    const occasions = await getAllOccasions();
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
//PATCH /api/occasions
router.patch('/:id', adminToken, async(req, res, next) =>{
  const occasionId = req.params.id;
  const { name, categories } = req.body;

  try {
    const occasion = await updateOccasion(occasionId, {
      name,
      categories
    });
    if(!occasion) {
      const error = Error(`Ocassion with ID ${occasionId} can be editied by admin`);
      error.statusCode = 401;
      throw error;
    }
    res.send(occasion);
  }catch(error) {
   console.error(error);
   next(error);
  }
});
//DELETE /api/occasions/:occasionsId
router.delete('/:routineId', async(req, res, next) => {
  const occasionId = req.params.occasionId;
  try {
    const deletedOccasion = await destroyOccasion(occasionId);

    if(!deletedOccasion) {
        const error = new Error(`Occasins can only be deleted by admin`);
    }
    res.send({ message: `Occasion with ID ${occasionId} has been deleted`})
  } catch(error) {
    console.error(error);
    next(error)
  }
});


module.exports = router;