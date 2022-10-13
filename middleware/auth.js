const jwt = require("jsonwebtoken");
const config  = require('../.env')


  const isAuth = async (req, res, next) =>{
    
  const authHeader = req.headers.token;

  if (authHeader) {
    //const token = authHeader.split(" ")[1];
    
    const user = await jwt.verify(authHeader, process.env.SECRET_KEY)

      if (!user){
        return res.status(403).json("Token is not valid!");
      } 

      req.user = user;
      next();
    
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}


exports.authorizeRoles = (...isAuth) => {
    return (req, res, next) => {
      if (!{isAuth:true}) {
        return next(
         
            `isAuth: FALSE is not allowed to access this resource `,
            403
        );
      }
      console.log("SFDFDFOS");
      next();
    };
  };

module.exports.isAuth  = isAuth