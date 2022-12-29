const express = require('express');
const router = express.Router();
const  Role  = require('../models/Role')

const { addRole, getRole, getAllRole } = require('../controllers/role_controllers')

router.post('/add', addRole)

router.get('/getRole/:id', getRole)

router.get('/getAll', getAllRole)

module.exports = router;