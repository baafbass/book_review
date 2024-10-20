const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
	if (req.session.authorization) {
		const token = req.session.authorization['token']

		if(!token) {
			return res.status(401).json({
				message: "Access denied,no token provided"
			})
		}

		try {
			const decoded = jwt.verify(token,'faridSecretKey')
            req.username = decoded.username
            next()
		} catch (error) {
			console.log(error)
			return res.status(403).json({
				message: 'User not logged in'
			})
		}

	} else {
	return res.status(403).json({
    message: "User not logged in---"
	})
}
}

module.exports = auth;