const User = require('../models/register.js')

exports.getLoginController = (req, res) => {
    const {email, password} = req.body
    User.findOne({email} , (err , user) => {
        if(user){
            if(password === user.password) {
                res.send({
                    message : "Login Successfully",
                    user : user
                })
            }else {
                res.send({
                    message : "Login Failure password no match"
                })
            }
        }else{
            res.send({
                message : "User Not registered!"
            })
        }
    })
    

}
