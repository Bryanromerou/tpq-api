const router = require("express").Router();
const db = require("../models");

router.get("/",(req,res)=>{
    res.json({categories: ["Ethics","Logic","Metaphysics","Epistemology"]});
});

// req.params.category = category
router.get("/:category",(req,res)=>{
    db.Question.find({category:req.params.category}).then((foundQuestions)=>{
        res.json({questions: foundQuestions})
    })
});

module.exports = router;