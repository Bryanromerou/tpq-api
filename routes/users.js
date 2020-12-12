const router = require('express').Router();
const User = require('../models/User');


/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

router.get('/',async(req,res)=>{
try {
    const users = await User.find();//await can only work inside of an async function
    if(!users) throw Error('No users Exist');
    res.json(users);
    // res.json({users:users.length});

} catch (e) {
    res.status(400).json({msg: e.message})
}
});

router.get('/:id',(req,res)=>{
    User.findById(req.params.id).populate('questions').then((user)=>{

        res.json({user: user})

    }).catch((err)=>{

        console.log('Error in question.show', err);
        res.json({Error: 'Unable to get your data'})

    });
});

module.exports = router;