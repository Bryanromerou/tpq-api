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
    const replyId = req.params.id;
    db.Reply.findByIdAndDelete(replyId).then((deletedReply)=>{
        db.Question.findOne({'replies': replyId}).then((foundQuestion)=>{
            foundQuestion.replies.remove(replyId)
            foundQuestion.save().then((updatedQuestion)=>{
                res.json({question: updatedQuestion});
            })
        });
        // res.json({reply: deletedReply})
    }).catch((err)=>{
        console.log('Error in reply.destroy', err);
        res.json({Error: 'Unable to Delete data'})
    });
};

const create1 = (req,res)=>{
    //Looks for question with given Id
    db.Question.findById(req.body.questId).then((foundQuestion)=>{
        
        // Creates a Reply
        const newReply = new db.Reply({
            reply: req.body.reply,
            questions:foundQuestion
        });
        if(req.body.user) newReply.user = req.body.user;

        //Saves the Reply
        newReply.save().then((savedReply)=>{
            db.User.findById(req.body.user).then((foundUser)=>{
                foundUser.replies.push(savedReply._id);
                foundUser.save().then(
                    res.json({savedReply})
                ).catch((error)=>{
                    res.json({Error: error, personalError: "Problem saving question to user"})
                })
            }).catch((error)=>{res.json({Error:error, savedReply: savedReply})})

            //Adds the saved reply to the array of replies inside of the question object
            foundQuestion.replies.push(savedReply);

            //Saves Modified Question
            foundQuestion.save().then((savedQuestion)=>{

                //Returns Modified question and saved reply
                res.status(201).json({reply: savedReply});
            }).catch((e)=>{
                res.json({Error: e})
            });
        }).catch((e)=>{
            res.json({Error: e})
        })

    }).catch((err)=>{

        console.log('Error in reply.create', err);
        res.json({Error: e})

    });
};


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    create1
}