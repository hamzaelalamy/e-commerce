const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number},
    password: {type: String, required:true},
    role: {type:String, enum:['admin','user'],  default:'user'}  // admin or user
  },
   {timestamps : true});

module.exports = mongoose.model("User", userSchema);