const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [] 
    }],
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer