const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const jwt_secret = process.env.JWT_SECRET;
// console.log(jwt_secret)
// console.log(process.env.header)
router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Email already exist" })
        }
        else {
            // Generating password hash
            const salt = await bcrypt.genSalt(10)
            const hashpass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashpass
            })

            const data = {
                user: user.id
            }
            const authtoken = jwt.sign(data, jwt_secret)
            res.json({ authtoken })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//    .then((user) => req.json(user))
//    .catch(error => {console.log(error)
//     res.json({err_msg: error.message})})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        let passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const data = {
            user: user.id
        }
        const authtoken = jwt.sign(data, jwt_secret)
        return res.json({ authtoken })

    }catch(error){
        console.log(error.message)
        return res.status(500).send("Internal error occured.")
    }
 
})

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        // let userId = undefined
        let userId = req.user;
        console.log(userId)
        const user = await User.findById(userId).select("-password")
        res.send(user)
        // console.log(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal server error')
    }
})

module.exports = router