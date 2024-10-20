const express  = require('express')
const auth = require('../middlewares/auth')
const {
	login,
	addBookReview,
	deleteBookReview
} = require('../controllers/user.controller')

const regd_users = express.Router()

regd_users.post('/login',login)
regd_users.put('/auth/review/:isbn',auth,addBookReview)
regd_users.delete('/auth/review/:isbn',auth,deleteBookReview)


module.exports.authenticated = regd_users;