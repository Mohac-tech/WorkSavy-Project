const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const { register, login, refreshToken, logout, resetPassword } = require('../controllers/users_controllers')

router.post("/register", register);

router.post("/login", login );

router.post("/refreshToken",auth, refreshToken )

router.post("/logout", auth, logout);

router.post("/resetPassword", resetPassword )

module.exports = router;
