const express = require("express");
const { saveUserProgress, getSpecificQuizProgress, getAllUserProgress, getUserDashboardStats, getLatestQuizzes } = require("../controllers/userProgressController");
const authenticate = require("../middleware/auth");

const router = express.Router();
router.get("/getSpecificQuizProgress/:quizId",authenticate, getSpecificQuizProgress);

router.post("/",authenticate, saveUserProgress);

// router.get("/:userId/:quizId", getAllUserProgress);

router.post("/getAllUserProgress",authenticate, getAllUserProgress);
router.get("/getUserDashboardStats",authenticate, getUserDashboardStats);
router.get("/getLatestQuizzes",authenticate, getLatestQuizzes);
router.get("/console/:num",authenticate,(req,res)=>{
console.log(req.params)
})
// router.get("/getUserBestPerformances",authenticate, getUserBestPerformances);

module.exports = router;
