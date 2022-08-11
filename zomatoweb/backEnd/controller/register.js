const User = require('../models/register.js')

exports.getregisterController = (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email, password: password }, (err, user) => {
        if (user) {
            res.send({
                message: 'user already registered'
            })
        } else {
            const user = new User({
                userName: name,
                email,
                password,
                reEnterPassword: password,
            })

            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({
                        message: "Successfully registered user"
                    })
                }
            })
        }
    })
}
