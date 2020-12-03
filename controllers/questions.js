const db = require("../models");
const mongoose = require('mongoose')


const index = (req,res)=>{
    db.Question.find({}).then((foundQuestions)=>{

        res.json({questions: foundQuestions})
    
    }).catch((err)=>{

        console.log('Error in question.index', err);
        res.json({Error: 'Unable to get your data'})

    });
};


const show = (req,res)=>{
    db.Question.findById(req.params.id).populate('replies').then((foundQuestion)=>{

        res.json({question: foundQuestion})

    }).catch((err)=>{

        console.log('Error in question.show', err);
        res.json({Error: 'Unable to get your data'})

    });
};


const create = (req,res) =>{
    db.Question.create(req.body).then((savedQuestion)=>{
        db.User.findById(req.body.user).then((foundUser)=>{
            foundUser.questions.push(savedQuestion._id);
            foundUser.save().then(
                res.json({savedQuestion})
            ).catch((error)=>{
                res.json({Error: error, personalError: "Problem saving question to user"})
            })
        }).catch((error)=>{res.json({Error:error, savedQuestion: savedQuestion})})
        res.status(201).json({question: savedQuestion});

    }).catch((err)=>{

        console.log('Error in question.create', err);
        res.json({Error: 'Unable to submit your data'})

    });
};


const update = (req,res)=>{
    db.Question.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},// This is set to {$set: req.body} instead if just req.body because we don't want to override the whole object we only want to override the field coming from the request body
        { new: true}).then((updatedQuestion)=>{

            res.json({question: updatedQuestion})

        }).catch((err)=>{

            console.log('Error in question.update', err);
            res.json({Error: 'Unable to Update data'})

        });
    // res.send("updating data");
};


const destroy = (req,res)=>{
    const questionId = req.params.id;
    db.Question.findByIdAndDelete(req.params.id).then((deletedQuestion)=>{
        // res.json({question: deletedQuestion});
        db.Reply.deleteMany({_id:{$in: deletedQuestion.replies}}).then((response)=>{
            db.User.findOne({'question': questionId}).then((foundUser)=>{
                foundUser.questions.remove(questionId)
                foundUser.save().then((updatedUser)=>{
                    res.json({user: updatedUser});
                })
            });
            // res.json(response);
        }).catch((error)=>{
            res.json({Error: error})
        });
    }).catch((err)=>{
        console.log('Error in question.destroy', err);
        res.json({Error: 'Unable to Delete data'})
    });
};



module.exports = {
    index,
    show,
    create,
    update,
    destroy
}