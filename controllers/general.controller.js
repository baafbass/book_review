let books = require('../config/booksdb')
const users = require('../config/usersdb').users
const isValid = require('./user.controller').isValid

const userExist = (username) => {
	const existingUsers = users.filter((user)=> {
		return user.username === username
	})
	return existingUsers.length > 0
}

const register = (req,res) => {
	const {username,password} = req.body;

    if(userExist(username)) {
    	return res.status(409).json({
    		message: "User already exist"
    	})
    }

    const user = {
    	username:username,
    	password:password
    }

    users.push(user)

    return res.status(201).json({
    	message: "User successfully created",
        user
    })

}

const getBookList = (req,res) => {
   return res.status(200).json(JSON.stringify(books))
}

const getBookDetailsByISBN = (req,res) => {
      const {isbn} = req.params;
      const book = books[isbn];
      
      if(!book) {
      	return res.status(404).json({
      		message: "The book details was not found",
      	})
      }
       
      return res.status(200).json({book})
}

const getBookDetailsByAuthor = (req,res) => {
	const {author} = req.params;
   
	const keys = Object.keys(books)

	var book = []

    keys.map((key)=>{
		if (books[key].author === author) book.push(books[key])
	})

	if (!book) {
		return res.status(404).json({
			message: "The book details was not found",
		})
	}

    return res.status(200).json(book);
}

const getBooksByTitle = (req,res) => {
	const {title} = req.params;

	var book = []

	const keys = Object.keys(books)

	keys.map((key)=> {
		if (books[key].title === title) book.push(books[key])
	})

	if (!book) {
		return res.status(404).json({
			message: "The books was not found",
		})
	}

	return res.status(200).json(book)

}

const getBookReview = (req,res) => {
	const {isbn} = req.params;

	const book = books[isbn]

    if (!book) {
		return res.status(404).json({
        message: "The book was not found"
		})
	}

	const reviews = book.reviews;

	return res.status(200).json(reviews)
}

module.exports = {
	register,
	getBookList,
	getBookDetailsByISBN,
	getBookDetailsByAuthor,
	getBooksByTitle,
	getBookReview
}