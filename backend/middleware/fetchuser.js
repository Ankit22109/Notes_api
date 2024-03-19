const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET
const fetchuser = (req, res, next) => {
    // Get the user from jwt token and id to req object
    const token = req.header(process.env.header)
    // console.log(token)

    if (!token) {
        return res.status(401).send({ error: "Please authenticate using valid token" })
    }

    try {
        const data = jwt.verify(token, jwt_secret)
        req.user = data.user;
        req.query = data;
        // req.user.id = data
        next();
    } catch (error) {
        console.log(error.message)
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;