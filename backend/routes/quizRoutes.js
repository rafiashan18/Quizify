const { Router } = require("express");  
const authenticate = require("../middleware/auth");
const { uploadQuiz, quizImageUpload } = require("../config/cloudinary");
const {addQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz, deleteQuizQuestion} = require('../controllers/quizController')
const router = Router();
// router.put('/updateUser', authenticate, updateUser);
// router.post('/uploadProfilePicture', authenticate, upload.single('profileImage'), handleMulterError, uploadProfilePicture);
// router.get('/showUsers', authenticate, showUsers);
// router.put('/:userId/status', authenticate, updateUserStatus);
// router.delete('/:userId/deleteUser', authenticate, deleteUser);
// router.post('/addQuiz', authenticate, uploadQuizImages, handleMulterError, addQuiz);

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

module.exports = router;