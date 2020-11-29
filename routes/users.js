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
        if(!user) throw Error('No users Exist');
        res.json(users);

    } catch (e) {
        res.status(400).json({msg: e.message})
    }
 });

 module.exports = router;