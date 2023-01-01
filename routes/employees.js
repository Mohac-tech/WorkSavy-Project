const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const { registerEmp, editEmp, informationEmp, getAllEmp, deleteEmp } = require('../controllers/emp_controllers')

router.post("/register", registerEmp);

router.patch('/edit/:id', auth, editEmp)

router.get('/information/:id', auth, informationEmp)

router.get('/getAll',auth, getAllEmp)

router.delete('/delete/:id',auth, deleteEmp)

module.exports = router