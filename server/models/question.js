const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, `Question is required`],
    },
    description: {
        type: String,
        required: [true, `Please make your question clear enough for someone to answer 😇`],
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User' 
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
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    views: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question