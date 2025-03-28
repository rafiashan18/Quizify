const { Router } = require("express"); 
const router = Router();
const authenticate = require("../middleware/auth");
const { paymentIntent } = require("../controllers/paymentController");

router.post("/create-payment-intent",authenticate,paymentIntent)
module.exports=router;