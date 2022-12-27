const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const { register, edit, information, getAll, delete_ } = require('../controllers/emp_controllers')

router.post("/register", auth, register);

router.patch('/edit/:id', auth, edit)

router.get('/information/:id', auth, information)

router.get('/getAll',auth, getAll)

router.delete('/delete/:id',auth, delete_)

module.exports = router