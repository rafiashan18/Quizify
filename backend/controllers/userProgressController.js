const UserProgress = require("../models/UserProgress");
const Quiz = require("../models/Quiz");

const saveUserProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { quizId, quizTitle, score, totalQuestions, correctAnswers, responses } = req.body;

    if (!quizId || !responses) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingProgress = await UserProgress.findOne({ userId, quizId });
    
    let result;
    let statusCode;
    let message;

    if (existingProgress) {
      // Safely increment attempts, defaulting to 1 if undefined
      existingProgress.attempts = (existingProgress.attempts || 0) + 1;
      
      existingProgress.score = score;
      existingProgress.totalQuestions = totalQuestions;
      existingProgress.correctAnswers = correctAnswers;
      existingProgress.responses = responses;
      existingProgress.attemptedAt = new Date(); 
      existingProgress.quizTitle = quizTitle;

      result = await existingProgress.save();
      statusCode = 200;
      message = "Progress updated successfully";
    } else {
      const newProgress = new UserProgress({
        userId,
        quizId,
        quizTitle,
        score,
        totalQuestions,
        correctAnswers,
        responses,
        attemptedAt: new Date(),
        attempts: 1,
      });
      
      result = await newProgress.save();
      statusCode = 201;
      message = "Progress saved successfully";
    }

    const quizResponse = await Quiz.findByIdAndUpdate(quizId, { $inc: { attempts: 1 } });
   
    res.status(statusCode).json({ message, progress: result });
  } catch (error) {
    console.error("Error saving/updating progress:", error);
    res.status(500).json({ message: "Error saving progress", error: error.message });
  }
};

// const getSpecificQuizProgress = async (req, res) => {
  
//   res.status(200).json({ "message": "hello" , "params":req.params });
// };

const getSpecificQuizProgress = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.userId;

    const progress = await UserProgress.findOne({ userId, quizId });

    if (!progress) {
      return res.status(200).json({ 
        message: "No progress found, returning default progress",
        progress: {
          quizId,
          userId,
          status: "not_started",
          score: 0,
          attempts: 0
        }
      });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress", error: error.message });
  }
};


const getAllUserProgress = async (req, res) => {
  try {
    const {userId} = req.body;
    console.log(userId)
    const progressList = await UserProgress.find({ userId });

    return res.status(200).json(progressList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress history", error: error.message });
  }
};

const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userProgresses = await UserProgress.find({ userId });

    if (!userProgresses.length) {
      return res.status(200).json({
        uniqueQuizCount: 0,
        totalQuestions: 0,
        totalCorrectAnswers: 0,
        bestPerformance: "0%"
      });
    }

    const uniqueQuizIds = [...new Set(userProgresses.map(progress => progress.quizId.toString()))];
    const uniqueQuizCount = uniqueQuizIds.length;

    const totalQuestions = userProgresses.reduce((acc, quiz) => acc + quiz.totalQuestions, 0);
    const totalCorrectAnswers = userProgresses.reduce((acc, quiz) => acc + quiz.correctAnswers, 0);

    const performances = userProgresses.map(quiz => (quiz.score / quiz.totalQuestions) * 100);
    const bestPerformance = Math.max(...performances).toFixed(0) + "%";

    res.status(200).json({
      uniqueQuizCount,
      totalQuestions,
      totalCorrectAnswers,
      bestPerformance
    });
  } catch (error) {
    console.error("Error fetching user dashboard stats:", error);
    res.status(500).json({ message: "Error fetching dashboard statistics", error: error.message });
  }
};



const getLatestQuizzes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const limit = req.query.limit || 3;

    const latestQuizzes = await UserProgress.find({ userId })
      .sort({ attemptedAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json(latestQuizzes);
  } catch (error) {
    console.error("Error fetching latest quizzes:", error);
    res.status(500).json({ message: "Error fetching latest quizzes", error: error.message });
  }
};

module.exports = { saveUserProgress, getSpecificQuizProgress, getAllUserProgress ,getUserDashboardStats,getLatestQuizzes };
