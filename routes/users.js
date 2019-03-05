const errors = require('restify-errors')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const auth = require('../auth')

module.exports = server => {

    // Register User
    server.post('/register', (req, res, next) => {
        const {
            email,
            password
        } = req.body

        const user = new User({
            email,
            password
        })

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                // Hash password
                user.password = hash
                //Save User
                try {
                    newUser = await user.save()
                    res.send(201)
                    next()
                } catch (err) {
                    return next(new errors.InternalError(err))
                }

            })
        })

    })

    //Auth User - use the auth.js thing we created as a call back to ensure the user is authenticated
    server.post('/auth', async (req, res, next) => {
        const {
            email,
            password
        } = req.body

        try {
            //authenticate user
            const user = auth.authenticate(email, password)
            console.log(user);

            next()
        } catch (error) {
            // user unanauthorized
            return next(new errors.UnauthorizedError(error))
        }

    })
}