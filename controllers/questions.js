const db = require("../models");

const index = (req,res)=>{
    db.Question.find({}).then((foundQuestions)=>{
        res.json({questions: foundQuestions})
    }).catch((err)=>{
        console.log('Error in question.index', err);
        res.json({Error: 'Unable to get your data'})
    });

    // res.send("Now sending all of the question data");
};

const show = (req,res)=>{
    res.send("now sending data from specific id");
};

const create = (req,res) =>{
    db.Question.create(req.body).then((savedQuestion)=>{
        res.status(201).json({question: savedQuestion});
    }).catch((err)=>{
        console.log('Error in question.create', err);
        res.json({Error: 'Unable to submit your data'})
    });
}


module.exports = {
    index,
    show,
    create,
}