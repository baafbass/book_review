const jwt = require('jsonwebtoken')
let books = require('../config/booksdb')
let users = require('../config/usersdb').users

const isValid = (username) => {
    const validUsers = users.filter((user)=>{
        return user.username === username;	
    })
    return validUsers.length > 0
}

const authenticatedUser = (username,password) => {
    const authenticatedUsers = users.filter((user)=>{
    	return user.username === username && user.password === password;
    })
    return authenticatedUsers.length > 0
}

const login = (req,res) => {
	const {username,password} = req.body;
    
    if (!isValid(username)) {
    	return res.status(401).json({
    		message: "User is not valid"
    	})
    }

    if (authenticatedUser(username,password)) {
    	const token = jwt.sign({username},'faridSecretKey',{expiresIn:60*60})

    	req.session.authorization = {
    		token,username
    	}

    	return res.status(200).json({
    		message: "User logged successfully",
    		token
    	})
    }

    return res.status(208).json({
    	message: "Invalid login. Check username or password"
    })
}

const addBookReview = (req,res) => {
      const {review} = req.query;
      const {isbn} = req.params;
      const username = req.username;
      
      const book = books[isbn]

      if(!book) {
        return res.status(404).json({
            message: "The book to added review was not found",
        })
      }

      if (book['reviews'][username] === review){
        return res.status(200).json({
            message: "The review already exist"
        })
      }

      if (book['reviews'][username]){
        book['reviews'][username] = review;
        return res.status(201).json({
            message: 'Review updated successfully'
        })
      }

      book['reviews'][username] = review;

      return res.status(201).json({
        message: 'Review added successfully',
        review: book['reviews'][username]
      })
}

const deleteBookReview = (req,res) => {
    const {isbn} = req.params;
    const username = req.username;

    const book = books[isbn];

    if(!book){
        return res.status(404).json({
            message: 'The Book was not found',
        })
    }

    if(!book['reviews'][username]){
       return res.status(404).json({
        message: "No review was found",
       })
    }

    delete book['reviews'][username];

    return res.status(209).json({
        message: "Review successfully deleted",
        reviews: book['reviews'],
    })
}

module.exports.isValid = isValid;
module.exports = {
	login,
	addBookReview,
    deleteBookReview
}