const express = require("express");
const router = express.Router();
const { User } = require("../models/Users");

router.get("/", async (req, res) => {
   await res.status(200).json({ success: false });
});

router.post("/create", async (req, res) => {
   const salt = await bcrypt.genSalt();
   const hashPassword = await bcrypt.hash(req.body.password, salt);

   const user = new Users({
      fistName: req.body.firstN,
      lastName: req.body.lastN,
      email: req.body.email,
      //  image:le: String,
      passwordHash: hashPassword,
      dob: req.body.dob,
      localisation: Users.findOne({ name: req.body.localisation }).ObjectId,
      department: Dept.findOne({ name: req.body.localisation }).ObjectId,
   });
   try {
      await user.save();
      res.status(201);
   } catch (err) {
      res.status(404);
   }
});

router.post("/login", async (req, res) => {
   try {
      const username = req.body.username;
      const password = req.body.password;
      const user = await Users.find({ email: username });

      if (user == null) {
         res.status(401);
      }

      if (user.email == username) {
         if (await bcrypt.compare(user.passwordHash, password)) {
            res.status(200);
         } else {
            res.status(401);
         }
      } else {
         res.status(401);
      }
   } catch (err) {
      res.json({ message: err.message() });
   }
});

module.exports = router;
