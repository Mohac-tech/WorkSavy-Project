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
      return res.sendStatus(201);
   } catch (err) {
      return res.sendStatus(404);
   }
})

router.patch('/edit/:id', async (req,res) => {

    try
    {
    const id = req.params.id 
    const edit = req.body.name
    const dept = await Dept.findById(id, {name: edit })
    
      return res.sendStatus(201);
   } catch (err) {
      return res.sendStatus(404);
   }
})

router.delete('/delete/:id', async (req,res) => {

    try
    {
    const id = req.params.id 
    const dept = await Dept.findById(id).remove()
    
      return res.sendStatus(201).json(dept);
   } catch (err) {
      return res.sendStatus(404);
   }
})

router.get('/getAll', async (req,res) => {

    try
    {
    const dept = await Dept.find()
    
      return res.sendStatus(201).json(dept);
   } catch (err) {
      return res.sendStatus(404);
   }
})

module.exports = router;