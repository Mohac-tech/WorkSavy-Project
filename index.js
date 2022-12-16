const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Loc = require('./models/Localisation');
const Role = require('./models/Role');
const Emp = require('./models/Employee');
const Dept = require('./models/Departement');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/WorkSavy_DB', { useNewUrlParser: true}, () => console.log('Connected'));

/* 
app.post('/create/employee', async (req,res) => {

    console.log('here')
    const emp = new Emp({
        firstName: req.body.firstN,
        lastName: req.body.lastN,
        email: req.body.email,
        role: req.body.role,
        sin: req.body.sin,
        dob: req.body.dob,
     //   localisation: req.body.loc,
     //   department: req.body.dept
    })

    try{
      const saveEmp = await emp.save() 
      await res.json(saveEmp)
      console.log(req.body)
    }catch(err){
       await res.json({message: err.message})
    }
})
*/

app.post('/login', async (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    if(Emp.findOne({'email': username})){}
    else{return console.log('Doesnt exist')}
    if(Emp.findOne({'password': password})){}
    else{return console.log('Reinitiliser mot de passe')}

})

app.listen(3000, ()=>{
    console.log('Le serveur a demarré')
})

//mongoose.disconnect();