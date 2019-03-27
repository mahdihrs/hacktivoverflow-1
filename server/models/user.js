const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { encrypt } = require('../helpers/bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        min: [4, 'Incorrect input name'],
    },
    email: {
        type: String,
        required: true,
        validate: [{
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
              msg: "Incorrect email format"
            }, {
              isAsync: true,
              validator: function(v, cb) {
                User.findOne({
                    email: v
                })
                .then(user => {
                    if(user && user._id.toString() != this._id.toString()) {
                      cb(false)
                    } else {
                      cb(true)
                    }
                })
                .catch( (err) => {
                    throw err
                })
              },
              msg: "Email is already been used"
        }]
    },
    password: {
        type: String,
        required: [true, `Password is required for the sake of account security.`],
        min: [4, 'You have to make sure your password is secure'],
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    watchedTags: {
        type: Array
    },
    birthday: {
        type: Date,
        required: [true, 'Birthday field is required'],
    }
})

userSchema.pre('save', function(next) {
    this.password = encrypt(this.password)
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User