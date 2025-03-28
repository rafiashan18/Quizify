const { Router } = require("express");  
const authenticate = require("../middleware/auth");
const { uploadQuiz, quizImageUpload } = require("../config/cloudinary");
const {addQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz, deleteQuizQuestion,searchQuizzes} = require('../controllers/quizController')
const router = Router();
// CRUD Operations
router.post(
    "/addQuiz",
    authenticate,
    quizImageUpload,
    addQuiz
);

router.get(
    "/showQuizes",
    authenticate,
    getAllQuizzes
)
router.get(
    "/getQuizById/:id",
    authenticate,
    getQuizById
)
router.put(
    "/updateQuizById/:id",
    authenticate,
    quizImageUpload,
    updateQuiz
)
router.delete(
    "/deleteQuiz/:id",
    authenticate,
    deleteQuiz
)
router.delete(
 "/:quizId/deleteQuestion/:questionId",
    authenticate,
    deleteQuizQuestion
)
router.get('/getQuizSearchResults',authenticate,searchQuizzes)


module.exports = router;