const  Localisation  = require('../models/Localisation');

module.exports = {

    add:  async (req,res) => {

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
    },

    del: async (req,res) => {

        try
        {
          const id = req.params.id 
          const loc = await Localisation.findById(id).remove()
        
          return res.status(201).json({ error: false, message: "Succes: Location have been deleted" });
       } catch (err) {
          return res.status(500).json({ error: true, message: "Internal Servor Error" });
       }
    },

    getAll:  async (req,res) => {

        try
        {
        const loc = await Localisation.find()
        console.log(loc)
        
        return res.status(201).json({ error: false, loc, message: "Succes: Locations have been Geted" });
       } catch (err) {
          return res.status(500).json({ error: true, message: "Internal Servor Error" });
       }
    }
}