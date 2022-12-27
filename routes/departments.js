const express = require('express');
const router = express.Router();

const { add, edit, del, getAll } = require('../controllers/depts_controlles')

router.post('/add', add)

router.patch('/edit/:id', edit)

router.delete('/delete/:id', del)

router.get('/getAll', getAll)

module.exports = router;