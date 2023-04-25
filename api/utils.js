const jwt = require('jsonwebtoken');

const requireUser =((req, res, next) => {
    if (!req.user) {
      res.status(401)
      res.send({
        name: "unauthorized Error",
        message: "You must be logged in to perform this action",
        error: 'unauthorizedError'
      });
      return;
    }
    next();
});

const adminToken =((req,res,next) => {
    if(!req.user.isAdmin) {
        res.status(401)
        res.send({
            name:"unauthorized Error",
            message: "You must be logged in as admin to perform this action",
            error: 'unauthorizedAdminError'
        });
        return;
    }
    next();
});

module.exports = {requireUser, adminToken};
