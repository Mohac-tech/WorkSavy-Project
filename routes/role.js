const express = require('express');
const router = express.Router();
const  Role  = require('../models/Role')

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());

const logger = require('../logger/logger');
///const logger = require('../logger/logger');


const expressWinston = require('express-winston');

router.use(expressWinston.logger({
   winstonInstance: logger,
   statusLevels: true
}))

router.post('/add', async (req,res) => {

    const edit = req.body.edit 
    try
    {
      const role = new Role({
        name: edit
      })
    
      await role.save();
      return res.status(201).json({ error: false, message: "Succes: Role have been added" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

router.get('/getRole/:id', async (req,res) => {

    try
    {
      const id = req.params.id 
      const role = await Role.findById(id)
      console.log(role)
      return res.status(201).json({ error: false, message: "Succes: Role have been geted" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

router.get('/getAll', async (req,res) => {

    try
    {
    const role = await Role.find()
      console.log(role);
    
      return res.status(201).json({ error: false, message: "Succes: Role have been geted All" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

//router.use(expressWinston.errorLogger(loggerErr))

module.exports = router;