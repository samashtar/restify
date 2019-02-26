const errors = require('restify-errors')
const Customer = require('../models/Customer')







module.exports = (server) => {
    server.get('/customers', async (req, res, next) => {
        //Get Customers
        try {
            const customers = await Customer.find({})
            res.send(customers)
            next()
        } catch (err) {
            return next(new errors.InvalidContentError(err))
        }
    })

    // get single customer
    server.get('/customers/:id', async (req, res, next) => {
        //Get Customers
        try {
            const customer = await Customer.findById(req.params.id)
            res.send(customer)
            next()
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`there is no customer with the id of ${req.params.id}`))
        }
    })







    //Add Customer 
    server.post('/customers', async (req, res, next) => {
        // Check for JSON
        if (!req.is(('application/json'))) {
            return next(new errors.InvalidContentError("Expects 'application/json'"))
        }

        const {
            name,
            email,
            balance
        } = req.body

        const customer = new Customer({
            name,
            email,
            balance
        })

        try {
            const newCustomer = await customer.save()
            res.send(201)
            next()
        } catch (err) {
            return next(new errors.InternalError(err.message))

        }
    })
}