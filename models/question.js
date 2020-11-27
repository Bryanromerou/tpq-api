const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: String,
    category: String,
    replies: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Reply"
    }],
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;