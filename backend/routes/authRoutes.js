const express = require('express');
const router = express.Router();

const {signup , login, logout, getMe }= require("../controllers/authController");
const authenticate = require('../middleware/auth');

router.post('/signup',signup)
router.post('/login',login)
// router.post('/refresh-token',refreshToken)
router.post('/logout',authenticate,logout)
router.post('/me',authenticate,getMe)

module.exports = router;