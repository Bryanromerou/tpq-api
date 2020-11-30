const db = require("../models");


const index = (req,res)=>{
    db.Reply.find({}).then((foundReplies)=>{

        res.json({replies: foundReplies})
    
    }).catch((err)=>{

        console.log('Error in reply.index', err);
        res.json({Error: 'Unable to get your data'})

    });
};


const show = (req,res)=>{
    db.Reply.findById(req.params.id).then((foundReply)=>{

        res.json({reply: foundReply})

    }).catch((err)=>{

        console.log('Error in reply.show', err);
        res.json({Error: 'Unable to get your data'})

    });
};


const create = (req,res) =>{
    db.Reply.create(req.body).then((savedReply)=>{

        res.status(201).json({reply: savedReply});

    }).catch((err)=>{

        console.log('Error in reply.create', err);
        res.json({Error: 'Unable to submit your data'})

    });
};


const update = (req,res)=>{
    db.Reply.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},// This is set to {$set: req.body} instead if just req.body because we don't want to override the whole object we only want to override the field coming from the request body
        { new: true}).then((updatedReply)=>{

            res.json({reply: updatedReply})

        }).catch((err)=>{

            console.log('Error in reply.update', err);
            res.json({Error: 'Unable to Update data'})

        });
    // res.send("updating data");
};


const destroy = (req,res)=>{
    db.Reply.findByIdAndDelete(req.params.id).then((deletedReply)=>{
        res.json({reply: deletedReply})
    }).catch((err)=>{
        console.log('Error in reply.destroy', err);
        res.json({Error: 'Unable to Delete data'})
    });
};

const create1 = (req,res)=>{
    db.Question.findById(req.body.questId).then((foundQuestion)=>{
        const newReply = new db.Reply({
            reply: String,
            questions:foundQuestion,
        });
        newReply.save().then((savedReply)=>{
            foundQuestion.replies.push(savedReply);
            foundQuestion.save().then((savedQuestion)=>{
                res.status(201).json({reply: savedReply, question:savedQuestion});
            }).catch((e)=>{
                res.json({Error: e})
            });
        }).catch((e)=>{
            res.json({Error: e})
        })
        // foundQuestion.replies

    }).catch((err)=>{

        console.log('Error in reply.create', err);
        res.json({Error: e})

    });
    // res.send("hello")
};


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    create1
}