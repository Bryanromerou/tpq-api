const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    reply: String,
    questions: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
});

const Reply = mongoose.model("Reply", ReplySchema);
module.exports = Reply;