const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const { registerUser, loginUser, refreshToken, logoutUser, resetPasswordUser } = require('../controllers/users_controllers')

router.post("/register", registerUser);

router.post("/login", loginUser );

router.post("/refreshToken",auth, refreshToken )

router.post("/logout", auth, logoutUser);

router.post("/resetPassword", resetPasswordUser )

module.exports = router;
