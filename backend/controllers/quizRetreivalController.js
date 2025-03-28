const Quiz = require('../models/Quiz');

// Constants
const CATEGORIES = ['Science', 'History', 'Technology', 'Sports', 'Art','Geography', 'Trivia'];
const QUIZ_TYPES = ['easy', 'medium', 'hard', 'recent', 'popular'];
const LIMIT = 8;


const formatQuizData = (quiz) => ({
  _id: quiz._id,
  title: quiz.title,
  category: quiz.category,
  description: quiz.description,
  difficulty: quiz.difficulty,
  coverImage: quiz.coverImage,
  totalQuestions: quiz.questions ? quiz.questions.length : 0
});


const getQuizByCategoriesLimited = async (req, res) => {
  try {
    const quizesByCategories = {};
    
    for (const category of CATEGORIES) {
      const data = await Quiz.find({ category })
        .limit(LIMIT)
        .select("title category description difficulty coverImage questions");
      
      quizesByCategories[category] = data.map(formatQuizData);
    }
    
    return res.status(200).json({ quizesByCategories });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching quizzes", error: error.message });
  }
};


const getLimitedQuizBYCategoryAndType = async (req, res) => {
  try {
    const { category } = req.params;
    
    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    const quizzes = {};
    
    for (const type of QUIZ_TYPES) {
      let data = [];
      
      if (type === 'recent') {
        data = await Quiz.find({ category })
          .sort({ createdAt: -1 })
          .limit(LIMIT)
          .select("title category description difficulty coverImage questions");
      } else if (type === 'popular') {
        // Empty array for now as in original code
      } else {
        data = await Quiz.find({ category, difficulty: type })
          .limit(LIMIT)
          .select("title category description difficulty coverImage questions");
      }
      
      quizzes[type] = data.map(formatQuizData);
    }
    
    if (Object.keys(quizzes).length > 0) {
      return res.status(200).json(quizzes);
    } else {
      return res.status(404).json({ success: false, message: "No quizzes found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const getAllQuizzesByCategoryAndType = async (req, res) => {
  try {
    const { category } = req.params;
    const { type } = req.query;
    let filter = { category };

    if (type && type !== "all") { 
      if (type === "popular") {
        
        const quizzes = await Quiz.aggregate([
          { $match: filter },
          { $sample: { size: LIMIT } }
        ]);
        return res.status(200).json(quizzes.map(quiz => formatQuizData(quiz)));
      } else if (type === "recent") {
        const quizzes = await Quiz.find(filter)
          .sort({ createdAt: -1 })
          .limit(LIMIT)
          .select("title category description difficulty coverImage questions");

        return res.status(200).json(quizzes.map(formatQuizData));
      } else {
        filter.difficulty = type;
      }
    }

    const quizzes = await Quiz.find(filter)
      .limit(LIMIT)
      .select("title category description difficulty coverImage questions");

    return res.status(200).json(quizzes.map(formatQuizData));
  } catch (error) {
    return res.status(500).json({ message: "Error fetching quizzes", error: error.message });
  }
};

module.exports = {
  getQuizByCategoriesLimited,
  getLimitedQuizBYCategoryAndType,
  getAllQuizzesByCategoryAndType
};