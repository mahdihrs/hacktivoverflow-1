const Question = require('../models/question')

function isAdmin(req, res, next) {
    Question.findById(req.params.id)
    .then(q => {
        if (req.decoded.id != q.user) {
            res
                .status(401)
                .json({
                    msg: `UNAUTHORIZED ACCESS: Make sure you have an access to do this action`
                })
        } else {
            next()
        }
    })
    .catch(err => {
        res
            .status(401)
            .json({
                msg: `Unauthorized access`,
                err: err
            })
    })

}

module.exports = isAdmin