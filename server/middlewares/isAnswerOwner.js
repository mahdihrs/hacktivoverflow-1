const Answer = require('../models/answer')

function isAdmin(req, res, next) {
    Answer.findById(req.params.id)
    .then(a => {
        if (req.decoded.id != a.user) {
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