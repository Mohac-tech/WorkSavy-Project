const  Role  = require('../models/Role')

module.exports = {

   addRole: async (req,res) => {

      const edit = req.body.edit 

    try
      {
         const role = new Role({
         name: edit
         })
        
         await role.save();
         return res.status(201).json({ error: false, message: "Succes: Role have been added" });
      } 
      catch(err)
         {
          return res.status(500).json({ error: true, message: "Internal Servor Error" });
         }
   },

   getRole: async (req,res) => {

    try
     {
      const id = req.params.id 
      const role = await Role.findById(id)
      console.log(role)
      return res.status(201).json({ error: false, message: "Succes: Role have been geted" });
     }
      catch(err)
      {
        return res.status(500).json({ error: true, message: "Internal Servor Error" });
      }
  },

   getAllRole: async (req,res) => {
    try
      {
       const role = await Role.find()
       console.log(role);
   
       return res.status(201).json({ error: false, role, message: "Succes: Role have been geted All" });
      }
      catch(err)
        {
         return res.status(500).json({ error: true, message: "Internal Servor Error" });
        }
   }
}