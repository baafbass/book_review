const jwt = require('jsonwebtoken')
let books = require('../config/booksdb')
let users = require('../config/usersdb').users

const isValid = (username) => {

}

const authenticatedUser = (username,password) => {

}

const login = (req,res) => {

}

const addBookReview = (req,res) => {

}

module.exports.isValid = isValid;
module.exports = {
	login,
	addBookReview
}