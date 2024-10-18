let books = require('../config/booksdb')
const users = require('../config/usersdb').users
const isValid = require('./user.controller').isValid

const register = (req,res) => {

}

const getBookList = (req,res) => {

}

const getBookDetailsByISBN = (req,res) => {

}

const getBookDetailsByAuthor = (req,res) => {

}

const getBooksByTitle = (req,res) => {

}

const getBookReview = (req,res) => {

}

module.exports = {
	register,
	getBookList,
	getBookDetailsByISBN,
	getBookDetailsByAuthor,
	getBooksByTitle,
	getBookReview
}