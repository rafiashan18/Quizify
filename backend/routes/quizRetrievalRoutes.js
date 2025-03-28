const { Router } = require("express"); 
const router = Router();
const authenticate = require("../middleware/auth");
const { getQuizByCategoriesLimited, getQuizBYCategoryAndType, getLimitedQuizBYCategoryAndType, getAllQuizzesByCategoryAndType}  = require('../controllers/quizRetreivalController')

router.get('/allCategoriesByLimited',authenticate,getQuizByCategoriesLimited)
router.get('/getLimitedQuizBYCategoryAndType/:category',authenticate,getLimitedQuizBYCategoryAndType)
router.get('/getAllQuizzesByCategoryAndType/:category',authenticate, getAllQuizzesByCategoryAndType);
module.exports=router;