const express = require('express');
const router = express.Router();
const  Localisation  = require('../models/Localisation');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());

const logger = require('../logger/logger');
//const loggerErr = require('../logger/logger-err')

const expressWinston = require('express-winston');

router.use(expressWinston.logger({
   winstonInstance: logger,
   statusLevels: true
}))

router.post('/add', async (req,res) => {

    const edit = req.body.edit 
    try
    {
      const loc = new Localisation({
        name: edit
      })
    
      await loc.save();
      return res.status(201).json({ error: false, message: "Succes: Location have been added" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

router.delete('/delete/:id', async (req,res) => {

    try
    {
      const id = req.params.id 
      const loc = await Localisation.findById(id).remove()
    
      return res.status(201).json({ error: false, message: "Succes: Location have been deleted" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

router.get('/getAll', async (req,res) => {

    try
    {
    const loc = await Localisation.find()
    console.log(loc)
    
    return res.status(201).json({ error: false, message: "Succes: Locations have been Geted" });
   } catch (err) {
      return res.status(500).json({ error: true, message: "Internal Servor Error" });
   }
})

//router.use(expressWinston.errorLogger(loggerErr))

module.exports = router;