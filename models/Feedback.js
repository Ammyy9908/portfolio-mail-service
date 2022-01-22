const {model, Schema} = require('mongoose');


const feedback_schema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    create_at:{
        type: Date,
        default: Date.now
    }

});


module.exports = model('Feedback', feedback_schema);