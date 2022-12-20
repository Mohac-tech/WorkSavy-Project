const express = require('express');
const router = express.Router();
const  Localisation  = require('../models/Localisation');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());

router.post('/add', async (req,res) => {

    const edit = req.body.edit 
    try
    {
      const loc = new Localisation({
        name: edit
      })
    
      await loc.save();
      return res.sendStatus(201);
   } catch (err) {
      return res.sendStatus(404);
   }
})

router.delete('/delete/:id', async (req,res) => {

    try
    {
      const id = req.params.id 
      const loc = await Localisation.findById(id).remove()
    
      return res.sendStatus(201).json(loc);
   } catch (err) {
      return res.sendStatus(404);
   }
})

router.get('/getAll', async (req,res) => {

    try
    {
    const loc = await Localisation.find()
    console.log(loc)
    
      return res.sendStatus(201);
   } catch (err) {
      return res.sendStatus(404);
   }
})

module.exports = router;