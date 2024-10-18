const express = require('express')
const session = require('express-session')
const auth = require('./middlewares/auth')
const customer_routes = require('./routes/auth_users.route').authenticated
const general_routes = require('./routes/general.route').general

const app = express()

app.use(express.json())
app.use(session({secret:'fingerprint_customer',resave:true,saveUninitialized:true}))

app.use('/customer/auth/*',auth)

app.use('/customer',customer_routes)
app.use('/',general_routes)

module.exports = app