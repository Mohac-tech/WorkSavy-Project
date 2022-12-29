const User = require("../models/Users");
const Localisation = require("../models/Localisation");
const Dept = require("../models/Departement");

const Tokens = require("../models/tokens");
const { accesToken, accesRefresh } = require("../utils/generateTokens");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  logInBodyValidation,
  registerUsersValidation,
} = require("../utils/validationSchema");

module.exports = {
     
    register: async (req, res) => {

        console.log(req.body)

    const {error, value} = registerUsersValidation.validate(req.body);
       if(error){
          return res.status(401).json({error: true, message: error.details[0].message})
       }
 
    const loc = await Localisation.findOne({ name: req.body.localisation });
    const dept = await Dept.findOne({ name: req.body.dept });
 
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
 
    const email = await User.findOne({ email: req.body.email });
    
    if(email){
       return res.status(403).json({error: true, message: "An user with this email already exist !"});
    }
 
    const user = new User({
       fistName: req.body.firstN,
       lastName: req.body.lastN,
       email: req.body.email,
       image:  req.body.image,
       passwordHash: hashPassword,
       dob: req.body.dob,
       localisation: loc._id,
       department: dept._id,
    });
    try {
 
       await user.save();
       return res.status(201).json({ error: false, message: "User created successfully" });
    } catch (err) {
       res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
  },

    login: async (req, res) => {
        try {
     
           const {error, value} = logInBodyValidation.validate(req.body);
           if(error){
              return res.status(401).json({error: true, message: error.details[0].message})
           }
     
           const username = req.body.username;
           const password = req.body.password;
     
     
           const user = await User.findOne({ email: username });
           const user1 = {user}
     
           if (!user) {
              return res.status(401).json({ error: true, message: "Invalid email or password" });
           }
         
           const comp = await bcrypt.compare(password, user.passwordHash)
           console.log(comp)
           
           if (!comp ) {
                return res.status(401).json({error: true, message: "Wrong password"});
              } 
              
             const token = new Tokens({
                  token: accesToken(user1),
                  refreshToken: accesRefresh(user1)
             })
              token.save();

              user.tokens = token._id
              user.save() 
             
             return res.status(200).json({
                 error:false,
                 token: token.token, 
                 refreshToken: token.refreshToken,
                 message: "Logged in successfully"
              })
     
        } catch (err) {
           res.status(500).json({ error: err.message, message: "Internal Server Error" });
       }     
     },
      
     refreshToken: async (req, res) => {

        const user = await Tokens.findOne({ _id: req.user.user.tokens })

        const refreshToken = user.refreshToken
        console.log(user.refreshToken)
     
        if(!refreshToken){
           return res.status(401).json({ error: true, message: "Invalid token" });
        }
        jwt.verify(refreshToken, process.env.ACCES_REFRESH_TOKEN, async (err,user) => {
           if(err){
              return res.status(401).json({error: true, message: "Acces denied: Invalid token 2"})
           }
     
           delete user.iat;
           delete user.exp;
           const at  = jwt.sign(req.user.user, process.env.ACCES_TOKEN, {expiresIn: '30m'});
           return res.status(200).json({error: false, at: at, message: "Refresh token generated"});
        })
     },

     logout: async (req, res) => {
        const autHeader = req.headers['authorization'];
        const token = autHeader && autHeader.split(' ')[1];
     
     try
        {if(!token){
           return res.status(401).json({ error: true, message: "Invalid token" });
        }
        console.log("id", req.user.user._id)
        const recup = await Tokens.deleteOne({token: token})
        return res.status(200).json({error: false, message: "Logout successfully"});
     }catch(err){
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
     }
     
     },

     resetPassword: async (req, res) => {
        try 
        {  
           const username = req.body.username;
           const user = await User.find({ email: username });
     
           if (!user) {
              return res.status(401).json({ error: true, message: "Invalid email" });
           }
     
           const newPassword = req.body.new;
           const confirmPassword = req.body.confirm;
     
           if(newPassword == confirmPassword){
              const salt = await bcrypt.genSalt();
              const hashPassword = await bcrypt.hash(confirmPassword, salt);
             // await User.findOneAndUpdate(req.user._id,{passwordHash: hashPassword})
              return res.status(200).json({ error: false, message: "Password modified" });
           }else{
              return res.status(401).json({ error: true, message: "Passwods dont match" });
           }
        } catch (err) {
           console.log(err);
             res.status(500).json({ error: err.message, message: "Internal Server Error" });
        }
        } 

}