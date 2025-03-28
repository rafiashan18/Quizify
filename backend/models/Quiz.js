const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: String, required: true },
  imageUrl: { type: String }
});

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    coverImage: { type: String },
    isPremium: { type: Boolean, default: false },
    amount:{
     type:Number , 
     required: function(){return this.isPremium},
     min:[1,'Amount should be positive']
    },
     questions: [QuestionSchema],
    status:{type:String, default:"Active"},
    attempts:{type:Number, default:0 },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

QuizSchema.index({ quizTitle: "text" });

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;