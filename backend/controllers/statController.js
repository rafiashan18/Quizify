
const Quiz = require('../models/Quiz');
const User = require('../models/User');

const getAdminDashboardStats = async (req, res) => {
  try {
    const totalQuizzes = await Quiz.countDocuments();
    const activeQuizzes = await Quiz.countDocuments({ status: "Active" });
    const questionsResult = await Quiz.aggregate([
      { $project: { questionCount: { $size: "$questions" } } },
      { $group: { _id: null, total: { $sum: "$questionCount" } } }
    ]);
    const totalQuestions = questionsResult.length > 0 ? questionsResult[0].total : 0;
    const totalUsers = await User.countDocuments();
    
    res.status(200).json({
      success: true,
      data: {
        totalQuizzes: totalQuizzes.toLocaleString(),
        totalQuestions: totalQuestions.toLocaleString(),
        activeQuizzes: activeQuizzes.toLocaleString(),
        totalUsers: totalUsers.toLocaleString()
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};
module.exports={getAdminDashboardStats}