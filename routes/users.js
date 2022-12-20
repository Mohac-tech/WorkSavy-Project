import auth from "../middleware/auth.js"
const express = require("express");
const router = express.Router();
const  User  = require("../models/Users");
const jwt = require("jsonwebtoken")

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());

router.get("/", async (req, res) => {
   await res.sendStatus(200).json({ success: false });
});

router.post("/register", async (req, res) => {
   const salt = await bcrypt.genSalt();
   const hashPassword = await bcrypt.hash(req.body.password, salt);

   const user = new User({
      fistName: req.body.firstN,
      lastName: req.body.lastN,
      email: req.body.email,
      //  image:le: String,
      passwordHash: hashPassword,
      dob: req.body.dob,
      localisation: User.findOne({ name: req.body.localisation }).ObjectId,
      department: Dept.findOne({ name: req.body.localisation }).ObjectId,
   });
   try {

      await user.save();
      return res.sendStatus(201);
   } catch (err) {
      return await res.sendStatus(404);
   }

});

let accesToken = (user) => { jwt.sign(user, process.env.ACCES_TOKEN, {expiresIn: '30min'}) }
let accesRefresh = (user) => { jwt.sign(user, process.env.ACCES_REFRESH_TOKEN, {expiresIn: '1y'}) }

router.get("/login", async (req, res) => {
   try {
      const username = req.body.username;
      const password = req.body.password;
      const user = await User.find({ email: username });

      if (!user) {
         return res.status(401).json({ error: true, message: "Invalid email or password" });
      }
      const comp = await bcrypt.compare(user.passwordHash, password)
      if (!comp ) {
           return res.sendStatus(401);
         } 

         const at = accesToken(user);
         const rt = accesRefresh(user);

         User.findOneAndUpadate(user._id, { tokens: [{token: at, signAt: Date.now().toString()}] } )

         return res.status(200).json({
            error:false,
            at: at, 
            rt: rt,
            message: "Logged in successfully"
         })

   } catch (err) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }

});

router.get("/refreshToken", async (req, res) => {

   const autHeader = req.headers['autorization'];
   const token = autHeader && autHeader.split(' ')[1];

   if(token == null){
     return res.sendStatus(401)
   }
   jwt.verify(token, process.env.ACCES_REFRESH_TOKEN, async (err,user) => {
      if(err){
         return res.sendStatus(401)
      }

      delete user.iat;
      delete user.exp;
      const at = await accesToken(user);
      return res.sendStatus(200).json({at: at});
   })
})


router.delete("/login", async (req, res) => {
   const autHeader = req.headers['autorization'];
   const token = autHeader && autHeader.split(' ')[1];

   if(token == null){
     return res.sendStatus(401)
   }

   const token2 = req.user.tokens['token'];
   if(token2 === token){await User.findOneAndUpdate(req.user._id,{tokens: ''}) }  

});

router.post("/resetPassword", async (req, res) => {
   try 
   {
      const salt = await bcrypt.genSalt();
      
      const username = req.body.username;
      const user = await User.find({ email: username });

      if (user == null) {
         return res.sendStatus(401);
      }

      const newPassword = req.body.new;
      const confirmPassword = req.body.confirm;

      if(newPassword == confirmPassword){
         const hashPassword = await bcrypt.hash(confirmPassword, salt);
         user.passwordHash = hashPassword;
         return res.sendStatus(200)
      }else{
          return res.sendStatus(401).json({ message: "Veuillez reessayer" })
      }
   } catch (err) {
      console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
   }
   })

module.exports = router;
