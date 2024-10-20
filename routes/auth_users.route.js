const express  = require('express')
const auth = require('../middlewares/auth')
const {
	login,
	addBookReview,
} = require('../controllers/user.controller')

const regd_users = express.Router()

regd_users.post('/login',login)
regd_users.put('/auth/review/:isbn',auth,addBookReview)


module.exports.authenticated = regd_users;