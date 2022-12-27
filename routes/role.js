const express = require('express');
const router = express.Router();
const  Role  = require('../models/Role')

const { add, getRole, getAll } = require('../controllers/role_controllers')

router.post('/add', add)

router.get('/getRole/:id', getRole)

router.get('/getAll', getAll)

module.exports = router;