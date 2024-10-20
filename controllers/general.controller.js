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
	new Promise((resolve,reject)=>{
		if(books) {
			resolve(books)
		} else {
			reject('Books not found')
		}

	}).then((bookList)=>{
		return res.status(200).json(JSON.stringify(bookList))
	}).catch((error)=>{
		return res.status(500).json({
			error,
		})
	})
}

const getBookDetailsByISBN = (req,res) => {
      const {isbn} = req.params;
      const book = books[isbn];

      new Promise((resolve,reject)=>{
      	const book = books[isbn]

      	if(book){
      		resolve(book)
      	} else {
      		reject('The Book was not found')
      	}
      }).then((book)=>{
      	return res.status(200).json({book})
      }).catch((error)=>{
      	return res.status(404).json({
        error,
      	})
      })
}

const getBookDetailsByAuthor = (req,res) => {
	const {author} = req.params;

	new Promise((resolve,reject)=>{
		const keys = Object.keys(books)
		const Books = keys
		                  .filter((key)=>books[key].author===author)
		                  .map((key)=>books[key])

		if (Books.length > 0 ){
			resolve(Books)
		} else {
			reject('books by the specified author were not found')
		}
	}).then((books)=>{
		return res.status(200).json(books)
	}).catch((error)=>{
		return res.status(404).json({
			error,
		})
	})
}

const getBooksByTitle = (req,res) => {
	const {title} = req.params;

	new Promise((resolve,reject)=>{
		const keys = Object.keys(books)

		const book = keys
		                 .filter((key)=>books[key].title===title)
		                 .map((key)=>books[key])
		if(book.length > 0){
			resolve(book)
		} else {
			reject('The book was not found')
		}
	}).then((book)=>{
		return res.status(200).json(book)
	}).catch((error)=>{
		return res.status(404).json({
			error,
		})
	})
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