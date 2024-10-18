const express = require('express')
const {
	register,
	getBookList,
	getBookDetailsByISBN,
    getBookDetailsByAuthor,
    getBooksByTitle,
    getBookReview
} = require('../controllers/general.controller')

const public_users = express.Router()

public_users.post('/register',register)
public_users.get('/',getBookList)
public_users.get('/isbn/:isbn',getBookDetailsByISBN)
public_users.get('/author/:author',getBookDetailsByAuthor)
public_users.get('/title/:title',getBooksByTitle)
public_users.get('/review/:isbn',getBookReview)


module.exports.general = public_users;