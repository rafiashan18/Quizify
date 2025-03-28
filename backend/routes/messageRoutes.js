const { Router } = require("express"); 
const router = Router();
const authenticate = require("../middleware/auth");
const { createMessage, deleteMessage, showAllMessages, resolveMessage, sendReply } = require("../controllers/messageController");

router.post('/createMessage',createMessage);
router.delete('/deleteMessage/:id',authenticate,deleteMessage);
router.get('/showAllMessages',authenticate,showAllMessages);
router.put('/resolveMessage/:id',authenticate,resolveMessage)
router.post('/sendReply/:id',authenticate,sendReply)

module.exports=router