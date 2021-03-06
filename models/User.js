const mongoose = require("mongoose");
const { Schema, model } = require('mongoose');

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  replies: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Reply"
  }],
  questions: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Question"
  }],

});

const User = model('user', UserSchema);

module.exports = User;