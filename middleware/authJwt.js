const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
verifyToken = (req, res, next) => {
  
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  };
  isAdmin = (req, res, next) => {
    let email=req.userId;
      Staffs.findOne({
        attributes: [ 
          "code_staff",
          "email",
          "firt_name",
          "last_name",
          "password",
          "role",
          "createdAt",
          "updatedAt",
          "deleted",
        ],
        where: {
          email: email,
        },
      }).then(user => {
            if (user.role === "admin") {
              next();
              return;
            }
    
          res.status(403).send({
            message: "Require Admin Role!"
          });
          return;
       
      });
    
    
  };
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin:isAdmin
  };
  module.exports = authJwt;