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
    db.Question.findByIdAndDelete(req.params.id).then((deletedQuestion)=>{
        res.json({question: deletedQuestion})
    }).catch((err)=>{
        console.log('Error in question.destroy', err);
        res.json({Error: 'Unable to Delete data'})
    });
};

const addReplies = (req,res)=>{
    db.Question.findById(req.params.id).then((foundQuestion)=>{
        res.send("hello")
    }).catch((err)=>{

        console.log('Error in question.addReplies', err);
        res.json({Error: 'Unable to get your data'})

    });
}


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    addReplies
}