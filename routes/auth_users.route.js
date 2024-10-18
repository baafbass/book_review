const express  = require('express')
const {
	login,
	addBookReview,
} = require('../controllers/user.controller')

const regd_users = express.Router()

regd_users.post('/login',login)
regd_users.put('/auth/review/:isbn',addBookReview)


module.exports.authenticated = regd_users;