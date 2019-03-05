const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.authenticate = (email, password) => {
    //resolves if authentication successful, rejects if it isnt 
    return new Promise(async (resolve, reject) => {
        try {
            //Get User by email
            const user = await User.findOne({
                email
            })

            // if email exists, Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err

                if (isMatch) {
                    resolve(user) // successfully authenticated
                } else {
                    //password didnt match
                    reject('Authentication Failed')
                }
            })
        } catch (error) {
            // email not found
            reject('Authentication Failed')
        }
    })
}