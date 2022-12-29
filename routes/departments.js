const express = require('express');
const router = express.Router();

const { addDepts, editDepts, deleteDepts, getAllDepts } = require('../controllers/depts_controlles')

router.post('/add', addDepts)

router.patch('/edit/:id', editDepts)

router.delete('/delete/:id', deleteDepts)

router.get('/getAll', getAllDepts)

module.exports = router;