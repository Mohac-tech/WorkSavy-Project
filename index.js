const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const expressWinston = require('express-winston');
const logger = require('./logger/logger');
const bodyParser = require('body-parser');

const usersRoutes = require("./routes/users");
const roleRoutes = require("./routes/role");
const localisationRoutes = require("./routes/localisations");
const employeeRoutes = require("./routes/employees");
const departmentRoutes = require("./routes/departments");

const api = process.env.API_URL;

//Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

app.use(`${api}/employee`, employeeRoutes);
app.use(`${api}/role`, roleRoutes);
app.use(`${api}/localisation`, localisationRoutes);
app.use(`${api}/users`, usersRoutes);

module.exports = app
