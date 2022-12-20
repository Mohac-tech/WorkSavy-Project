import jwt from "jsonwebtoken";

const auth = async (req,res,next) => {
    const autHeader = req.headers['autorization'];
    const token = autHeader && autHeader.split(' ')[1];

    if(!token){
      return res
        .status(401)
        .json({ error: true, message: "Access Denied: No token provided"})
    }

    try {
        
        jwt.verify(token, process.env.ACCES_TOKEN, (err,user) => {
          if(err){
             return res
             .status(401)
             .json({ error: true, message: "Access Denied: Invalid jwt access token"})
          } 
          req.user = user
          next();
        })

    } catch (error) {
        console.log(err);
        return res
        .status(403)
        .json({ error: true, message: "Access Denied: Invalid token"})

    }
}