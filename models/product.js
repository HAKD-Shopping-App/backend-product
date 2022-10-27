var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var tourPlanSchema = new Schema({
    planId: {
        type: String,
        require: true
    },
    planName: {
        type: String,
        require: true
    },
    destination: {
        type: Array,
        require: true
    },

    rating: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    img: {
        type: String,
        require: true
    },

    activity: {
        type: Array,
        require: true
    },

    duration: {
        type: Number,
        require: true
    },

    max_travellers: {
        type: Number,
        require: true
    },

    payment_method: {
        type: String,
        require: true
    },

    guideId: {
        type: Object,
        require: true
    },

    

})

module.exports = mongoose.model('tourPlan', tourPlanSchema)