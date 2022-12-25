const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  Emp  = require('../models/Employee');
const  Role  = require('../models/Role');
const  Localisation  = require('../models/Localisation');
const  Dept  = require('../models/Departement');
//const bcrypt = require('bcrypt');

router.post("/register", async (req, res) => {

  const email = await Dept.findOne({ name: req.body.email });

  if(email){
    return res.status(403).json({error: true, message: "An user with this email already exist !"});
  }

   const role = await Role.findOne({ name: req.body.role });
   const loc = await Localisation.findOne({ name: req.body.localisation });
   const dept = await Dept.findOne({ name: req.body.dept });
  
    const user = new Emp({
       fistName: req.body.firstN,
       lastName: req.body.lastN,
       email: req.body.email,
       role: role._id,
       sin: req.body.sin,
       dob: req.body.dob,
       phoneNumber: req.body.phoneN,
       image: req.body.image,
       localisation: loc._id,
       department: dept._id,
    });
    try {  
       const u = await user.save();
       console.log(u)
        return res.status(201).json({ error: false, message: "Employee created successfully" });
    }catch(err) {
      return res.status(500).json({ error: true, message: "Internal servor error" });
    }  
});
//****************************LOOK****************************************/

//####### USE SWITCH OR IF TO DERTERMINE THE ELEMENT THE USER WANT TO MODIFY 

router.patch('/edit/:id', async (req,res) => {

   const id = req.params.id;

try{
   const r = await Role.findOne({ name: req.body.role });
   const l = await Localisation.findOne({ name: req.body.loc });
   const d = await Dept.findOne({ name: req.body.dept });

   Emp.findByIdAndUpdate(id, {
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
   })  
       return res.status(200).json({ error: false, message: "Success: Employee Information modified" });
      }catch(err) {
       return res.status(500).json({ error: true, message: "Internal Servor Error" });
      }

})

router.get('/information/:id', async (req,res) => {

    try
    {
      
    const id = req.params.id;
    const emp = await Emp.find({_id: id})

    console.log(emp)

    return res.status(200).json({ error: false, message: "Success: Employee Information returned" });
  }catch(err){
   return res.status(500).json({ error: true, message: "Internal Servor Error" });
  }
})

router.get('/getAll', async (req,res) => {
    try
    {
    const emp = await Emp.find();
    return res.status(200).json({ error: false, message: "Success: Employee Information returned" });
  }catch(err){
    return res.status(500).json({ error: true, message: "Internal Servor Error" });
  }
})

router.delete('/delete/:id', async (req,res) => {

    try
    {
        const id = req.params.id;
        const emp = await Emp.findByIdAndRemove({_id: id})
        console.log(emp);
        return res.status(200).json({ error: false, message: "Success: Employee have been deleted" });
  }catch(err){
       return res.status(500).json({ error: true, message: "Internal Servor Error" });
  }
})

module.exports = router