const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  Emp  = require('../models/Employee');
const  Role  = require('../models/Role');
const  Localisation  = require('../models/Localisation');
const  Dept  = require('../models/Departement');
//const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
const Users = require('../models/Users');
router.use(bodyParser.json());
router.use(express.json());


router.post("/register", async (req, res) => {
   const r = await Role.findOne({ name: req.body.role });
   const l = await Localisation.findOne({ name: req.body.localisation });
   const d = await Dept.findOne({ name: req.body.dept });
  
    const user = new Emp({
       fistName: req.body.firstN,
       lastName: req.body.lastN,
       email: req.body.email,
       role: r._id,
       sin: req.body.sin,
       dob: req.body.dob,
       phoneNumber: req.body.phoneN,
       image: req.body.image,
       localisation: l._id,
       department: d._id,
    });
    try {  
       const u = await user.save();
       console.log(u)
       return res.sendStatus(200);
    }catch(err) {
       return res.sendStatus(404);
    }  
});
//****************************LOOK****************************************/

//####### USE SWITCH OR IF TO DERTERMINE THE ELEMENT THE USER WANT TO MODIFY 

router.patch('/edit/:id', async (req,res) => {

   const value = req.body.value;
   const id = req.params.id;

   const r = await Role.findOne({ name: req.body.role });
   const l = await Localisation.findOne({ name: req.body.loc });
   const d = await Dept.findOne({ name: req.body.dept });


try { 

     switch (value) {
      case "firstN":
         await Emp.findByIdAndUpdate(id, { fistName: req.body.firstN });
         break;
      case "lastN":
          await Emp.findByIdAndUpdate(id, { lastName: req.body.lastN });
         break;
      case "email":
         await Emp.findByIdAndUpdate(id, { email: req.body.email });
         break;
      case "role":
          await Emp.findByIdAndUpdate(id, { role: r._id });
         break;
      case "sin":
         await Emp.findByIdAndUpdate(id, { sin: req.body.sin });
         break;
      case "dob":
         await Emp.findByIdAndUpdate(id, { dob: req.body.dob });
         break;
      case "phoneN":
         await Emp.findByIdAndUpdate(id, { phoneNumber: req.body.phoneN });
         break;
      case "loc":
         await Emp.findByIdAndUpdate(id, { localisation: l._id });
         break;
      case "image": 
         await Emp.findByIdAndUpdate(id, { image: req.body.image });
         break;
      case "dept":
         console.log('dept')
         await Emp.findByIdAndUpdate(id, { department: d._id });
         break;
     }    
          res.sendStatus(201);
      }catch(err) {
         console.log('Here')
         return res.sendStatus(404);
      }
})

router.get('/information/:id', async (req,res) => {

    try
    {
      
    const id = req.params.id;
    const emp = await Emp.find({_id: id})

    console.log(emp)

    res.sendStatus(200)
  }catch(err){
     res.json({message: "Pas bon"})
  }
})

router.get('/getAll', async (req,res) => {

    try
    {
    const emp = await Emp.find();
    res.json(emp);
  }catch(err){
     res.sendStatus(404)
  }
})

router.delete('/delete/:id', async (req,res) => {

    try
    {
        const id = req.params.id;
        const emp = await Emp.findByIdAndRemove({_id: id})
        console.log(emp);
        res.sendStatus(200);
  }catch(err){
     res.sendStatus(404)
  }
})

module.exports = router