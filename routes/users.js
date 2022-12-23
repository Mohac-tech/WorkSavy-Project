const {accesToken, accesRefresh} = require("../utils/generateTokens")
const express = require("express");
const router = express.Router();
const  User  = require("../models/Users");
const jwt = require("jsonwebtoken");
const  Localisation  = require('../models/Localisation');
const  Dept  = require('../models/Departement');
const  Tokens = require('../models/tokens')

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const auth = require('../middleware/auth')

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());

router.get("/", async (req, res) => {
   await res.sendStatus(200).json({ success: false });
});

router.post("/register", async (req, res) => {

   const l = await Localisation.findOne({ name: req.body.localisation });
   const d = await Dept.findOne({ name: req.body.dept });

   const salt = await bcrypt.genSalt();
   const hashPassword = await bcrypt.hash(req.body.password, salt);

   const user = new User({
      fistName: req.body.firstN,
      lastName: req.body.lastN,
      email: req.body.email,
      image:  req.body.image,
      passwordHash: hashPassword,
      dob: req.body.dob,
      localisation: l._id,
      department: d._id,
   });
   try {

      await user.save();
      return res.status(201).json({ error: false, message: "User created successfully" });
   } catch (err) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }

});

router.post("/login", async (req, res) => {
   try {
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
        
        return res.status(200).json({
            error:false,
            token: token.token, 
            refreshToken: token.refreshToken,
            message: "Logged in successfully"
         })

   } catch (err) {
      res.status(500).json({ error: err.message, message: "Internal Server Error" });
  }

});

router.get("/refreshToken", async (req, res) => {

   const autHeader = req.headers['authorization'];
   const token = autHeader && autHeader.split(' ')[1];

   const username = req.body.username;
   const user = await User.findOne({ email: username });
      const user1 = {user}


   if(!token){
      return res.status(401).json({ error: true, message: "Invalid token" });
   }
   jwt.verify(token, process.env.ACCES_REFRESH_TOKEN, async (err,user) => {
      if(err){
         return res.status(401).json({error: true, message: "Acces denied: Invalid token 2"})
      }

      delete user.iat;
      delete user.exp;
      const at  = jwt.sign(user1, process.env.ACCES_TOKEN, {expiresIn: '30m'});
      return res.status(200).json({error: false, at: at, message: "Refresh token generated"});
   })
})


router.post("/logout", auth, async (req, res) => {
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

});

router.post("/resetPassword", async (req, res) => {
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
   })

module.exports = router;
