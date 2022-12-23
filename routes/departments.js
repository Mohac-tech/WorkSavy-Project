const express = require('express');
const router = express.Router();
const { Dept } = require('../models/Departement');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());

router.post('/add', async (req,res) => {

    const edit = req.body.edit 
    try
    {
      const dept = new Dept({
        name: edit
      })
    
      await dept.save();
      return res.status(201).json({ error: false, message: "Succes: Department have been added" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

router.patch('/edit/:id', async (req,res) => {

    try
    {
    const id = req.params.id 
    const edit = req.body.name
    const dept = await Dept.findById(id, {name: edit })
    
    return res.status(201).json({ error: false, message: "Succes: Department have been edited" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

router.delete('/delete/:id', async (req,res) => {

    try
    {
    const id = req.params.id 
    const dept = await Dept.findById(id).remove()
    
    return res.status(201).json({ error: false, message: "Succes: Department have been deleted" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

router.get('/getAll', async (req,res) => {

    try
    {
    const dept = await Dept.find()
    
    return res.status(201).json({ error: false, message: "Succes: Department have been geted All" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

module.exports = router;