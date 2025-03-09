const { Router } = require("express");  
const User = require("../models/User");
const { updateUser, showUsers, uploadProfilePicture, updateUserStatus, deleteUser , addUser } = require("../controllers/userController");
const authenticate = require("../middleware/auth");
const { upload, handleMulterError } = require("../config/cloudinary");

const router = Router();
router.put('/updateUser', authenticate, updateUser);
router.post('/uploadProfilePicture', authenticate, upload.single('profileImage'), handleMulterError, uploadProfilePicture);
router.get('/showUsers', authenticate, showUsers);
router.put('/:userId/status', authenticate, updateUserStatus);
router.delete('/:userId/deleteUser', authenticate, deleteUser);
router.post('/addUser', upload.single('profilePicture'), authenticate, addUser);


module.exports = router;