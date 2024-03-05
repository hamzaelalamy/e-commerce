const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {type : String, required:true},
    price : {type : Number, required : true, min : [1, 'Must be at least 1, got {VALUE}']},
    description : {type : String},
    inStock : {type : Boolean, default : true},
    category: { type: String, required: true },
    images: [{ type: String }],
    quantity: {type:Number ,required:true},
    brand: { type: String },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        review: { type: String },
        createdAt: { type: Date, default: Date.now }
    }]
    } , {timestamps:true})

module.exports = mongoose.model('Product', productSchema);