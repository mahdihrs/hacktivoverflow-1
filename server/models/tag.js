const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        default: []
    }]
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag