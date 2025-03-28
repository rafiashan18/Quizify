const User = require("../models/User");
const Quiz = require('../models/Quiz');

const addQuiz = async (req, res) => {
    try {
        console.log(req.body);
        const { title, description, category, difficulty } = req.body;
        // console.log(req.body )
        // Handle cover image
        const isPremium = req.body.isPremium === 'true'
        let coverImageUrl = null;
        if (req.files && req.files.coverImage && req.files.coverImage[0]) {
            coverImageUrl = req.files.coverImage[0].path;
        }

        // Get questions data
        let questionsData = req.body.questions || [];

        // Assign question images if they exist
        if (req.files && req.files.ImageUrl) {
            req.files.ImageUrl.forEach((file, index) => {
                if (index < questionsData.length) {
                    questionsData[index].imageUrl = file.path;
                }
            });
        }

        const newQuiz = new Quiz({
            title,
            description,
            category,
            difficulty,
            coverImage: coverImageUrl,
            isPremium: isPremium,
            amount:req.body.amount,
            questions: questionsData.map(q => ({
                questionText: q.questionText,
                options: q.options,
                correctOption: q.correctOption,
                imageUrl: q.imageUrl || null
            })),
            attempts:0,

        });

        await newQuiz.save();

        res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            quiz: newQuiz
        });
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({
            success: false,
            message: "Error creating quiz",
            error: error.message
        });
    }
};

// Get all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json({
            success: true,
            count: quizzes.length,
            quizzes
        });
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching quizzes",
            error: error.message
        });
    }
};

// Get a single quiz by ID
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            success: true,
            quiz
        });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching quiz",
            error: error.message
        });
    }
};

// Update a quiz
const updateQuiz = async (req, res) => {
    try {
        console.log(req.body);
        const { title, description, category, difficulty } = req.body;
        const isPremium = req.body.isPremium === 'true'

        let { questions } = req.body;

        if (questions && typeof questions === 'string') {
            try {
                questions = JSON.parse(questions);
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid questions format",
                    error: err.message
                });
            }
        }

        let updateData = {
            title,
            description,
            category,
            difficulty,
            isPremium:isPremium
        };

        console.log(updateData);

        if (req.files && req.files.coverImage && req.files.coverImage[0]) {
            updateData.coverImage = req.files.coverImage[0].path;
        }

        console.log(updateData.coverImage);

        if (questions) {
            updateData.questions = questions;

            if (req.files && req.files.ImageUrl) {
                req.files.ImageUrl.forEach((file, index) => {
                    if (index < updateData.questions.length) {
                        updateData.questions[index].imageUrl = file.path;
                    }
                });
            }
        }

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Quiz updated successfully",
            quiz: updatedQuiz
        });
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({
            success: false,
            message: "Error updating quiz",
            error: error.message
        });
    }
};

// Delete a quiz
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Quiz deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting quiz",
            error: error.message
        });
    }
};

const addQuestionToQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        const { questionText, options, correctOption } = req.body;

        let imageUrl = null;
        if (req.files && req.files.imageUrl && req.files.imageUrl[0]) {
            imageUrl = req.files.imageUrl[0].path;
        }

        const newQuestion = {
            questionText,
            options,
            correctOption,
            imageUrl
        };

        quiz.questions.push(newQuestion);
        await quiz.save();

        res.status(201).json({
            success: true,
            message: "Question added successfully",
            quiz
        });

    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({
            success: false,
            message: "Error adding question",
            error: error.message
        });
    }
};

const updateQuizQuestion = async (req, res) => {
    try {
        const { questionText, options, correctOption } = req.body;
        const quiz = await Quiz.findById(req.params.quizId);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        const questionIndex = quiz.questions.findIndex(
            q => q._id.toString() === req.params.questionId
        );

        if (questionIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        if (questionText) quiz.questions[questionIndex].questionText = questionText;
        if (options) quiz.questions[questionIndex].options = options;
        if (correctOption) quiz.questions[questionIndex].correctOption = correctOption;

        if (req.files && req.files.imageUrl && req.files.imageUrl[0]) {
            quiz.questions[questionIndex].imageUrl = req.files.imageUrl[0].path;
        }

        await quiz.save();

        res.status(200).json({
            success: true,
            message: "Question updated successfully",
            quiz
        });
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({
            success: false,
            message: "Error updating question",
            error: error.message
        });
    }
};

// Delete a question from a quiz
const deleteQuizQuestion = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        // Find and remove the question by its _id
        const questionIndex = quiz.questions.findIndex(
            q => q._id.toString() === req.params.questionId
        );

        if (questionIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        quiz.questions.splice(questionIndex, 1);
        await quiz.save();

        res.status(200).json({
            success: true,
            message: "Question deleted successfully",
            quiz
        });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting question",
            error: error.message
        });
    }
};
const searchQuizzes = async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
  
      // Perform a case-insensitive regex search in the "title" field
      const quizzes = await Quiz.find({
        title: { $regex: query, $options: "i" },
      }).limit(10); // Limit results for efficiency
      console.log(quizzes)
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Error searching quizzes", error: error.message });
    }
  };
module.exports = {
    addQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    addQuestionToQuiz,
    updateQuizQuestion,
    deleteQuizQuestion,
    searchQuizzes
};






