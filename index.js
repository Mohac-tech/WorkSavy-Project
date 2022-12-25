const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Loc = require('./models/Localisation');
const Role = require('./models/Role');
const Emp = require('./models/Employee');
const Dept = require('./models/Departement');
const Users = require('./models/Users');
const bcrypt = require('bcrypt');

require('dotenv').config();

const usersRoutes = require("./routes/users");
const roleRoutes = require("./routes/role");
const localisationRoutes = require("./routes/localisations");
const employeeRoutes = require("./routes/employees");
const departmentRoutes = require("./routes/departments");

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

const api = process.env.API_URL;

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true }, () => console.log('Connected'));

app.use(`${api}/employee`, employeeRoutes);
app.use(`${api}/role`, roleRoutes);
app.use(`${api}/localisation`, localisationRoutes);
app.use(`${api}/users`, usersRoutes);



app.listen(3000, () => {
    console.log('Le serveur a demarré')
})

//mongoose.disconnect();