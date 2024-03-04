const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {type : String, required:true},
    price : {type : Number, required : true, min : [1, 'Must be at least 1, got {VALUE}']},
    description : {type : String},
    inStock : {type : Boolean, default : true},
    } , {timestamps:true})

module.exports = mongoose.model('Product', productSchema);