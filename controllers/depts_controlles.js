const { Dept } = require('../models/Departement');

module.exports = {
    
    add:  async (req,res) => {

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
    },

    edit:  async (req,res) => {

        try
        {
        const id = req.params.id 
        const edit = req.body.name
        const dept = await Dept.findById(id, {name: edit })
        
        return res.status(201).json({ error: false, message: "Succes: Department have been edited" });
       } catch (err) {
          return res.status(500).json({ error: true, message: "Internal Servor Error" });
       }
    },

    del: async (req,res) => {

        try
        {
        const id = req.params.id 
        const dept = await Dept.findById(id).remove()
        
        return res.status(201).json({ error: false, message: "Succes: Department have been deleted" });
       } catch (err) {
          return res.status(500).json({ error: true, message: "Internal Servor Error" });
       }
    },

    getAll: async (req,res) => {

        try
        {
        const dept = await Dept.find()
        
        return res.status(201).json({ error: false, message: "Succes: Department have been geted All" });
       } catch (err) {
          return res.status(500).json({ error: true, message: "Internal Servor Error" });
       }
    }
}