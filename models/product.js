var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    band_colour: {
        type: String,
        required: true,
        trim: true
    }

    

})

module.exports = mongoose.model('productModel', productSchema,'products')