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
    	const token = jwt.sign({username},'faridSecretKey',{expiresIn:60*2})

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

}

module.exports.isValid = isValid;
module.exports = {
	login,
	addBookReview
}