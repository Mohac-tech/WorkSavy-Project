const express = require('express');
const router = express.Router();
const { add, del, getAll } = require('../controllers/loc_controllers')

router.post('/add', add)

router.delete('/delete/:id', del)

router.get('/getAll', getAll)

module.exports = router;