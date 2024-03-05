const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number},
    password: {type: String, required:true},
    photo: String,
    role: {type:String, enum:['admin','user'],  default:'user'},  // admin or user
    phoneNumber:{ type: String },
    adress: {street:{ typr: String}, city: { type: String}, postalCode:{ type: String},  country:{ type: String}},
    profileImage: { type: String },
    accountStatus: { type: String, enum: [ 'active', 'suspended', 'disabled'],  default: 'active'},
  },
   {timestamps : true});

module.exports = mongoose.model("User", userSchema);