const express = require('express');
const router = express.Router();
const { addLocalisation, deleteLocalisation, getAllLocalisation } = require('../controllers/loc_controllers')

router.post('/add', addLocalisation)

router.delete('/delete/:id', deleteLocalisation)

router.get('/getAll', getAllLocalisation)

module.exports = router;