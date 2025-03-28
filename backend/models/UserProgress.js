const mongoose = require("mongoose");

const UserProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  quizTitle:{type:String,required:true},
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  responses: [
    {
      questionId: { type: String, required: true },
      selectedOption: { type: String, default: null },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  attemptedAt: { type: Date, default: Date.now},
  attempts:{type:Number,required:true}
});

const UserProgress = mongoose.model("UserProgress", UserProgressSchema);
module.exports = UserProgress;
