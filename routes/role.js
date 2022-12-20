const express = require('express');
const router = express.Router();
const  Role  = require('../models/Role')

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());

router.post('/add', async (req,res) => {

    const edit = req.body.edit 
    try
    {
      const role = new Role({
        name: edit
      })
    
      await role.save();
      return res.sendStatus(201);
   } catch (err) {
      return res.sendStatus(404);
   }
})

router.get('/getRole/:id', async (req,res) => {

    try
    {
      const id = req.params.id 
      const role = await Role.findById(id)
      console.log(role)
      return res.sendStatus(201)
   } catch (err) {
      return res.sendStatus(404);
   }
})

router.get('/getAll', async (req,res) => {

    try
    {
    const role = await Role.find()
      console.log(role);
    
      return res.sendStatus(201);
   } catch (err) {
      return res.sendStatus(404);
   }
})

module.exports = router;