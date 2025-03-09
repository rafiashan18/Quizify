const mongoose= require('mongoose');
const QuestionSchema = mongoose.Schema(
    {
        questionText:{type:String,require:true},
        correctOption:{type:String, require:true},
        imageUrl:{type:String, optional:true},
        options:[{type:String,require:true,}],
        quizId:{type:mongoose.Schema.Types.ObjectId, ref:"Quiz"},
    }
)

const Question= mongoose.model('Question',QuestionSchema)
module.exports=Question;

