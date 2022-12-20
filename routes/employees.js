const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  Emp  = require('../models/Employee');
const  Role  = require('../models/Role');
const  Localisation  = require('../models/Localisation');
const  Dept  = require('../models/Departement');
//const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
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

// router.patch('/edit/:id', async (req,res) => {

//     try
//     {const id = req.params.id;
//     const toEdit = req.body.toEdit
//     const edit = req.body.edit
//     const emp = Emp.find({_id: id}).where(toEdit).equals()

//     Emp.findOneAndUpdate({_id: id},{ $set: { toEdit: edit }})

//   }catch(err){

//   }
// })

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