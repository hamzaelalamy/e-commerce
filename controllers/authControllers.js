const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import your Mongoose User model here
const secret = process.env.JWT_SECRET;
const maxAge = 60 * 60 * 24 * 3;

function createToken(email) {
    return jwt.sign({ email }, secret, {
        expiresIn: maxAge
    });
}

module.exports.logout = (req, res) => {
    res.clearCookie("jwtl");
    res.json({ message: 'cookie destroyed successfully' });
}

module.exports.signup_post = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if the email is already in use
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPass
        });

        // Save the user to the database
        await newUser.save();

        const token = createToken(newUser.email);
        res.cookie('jwts', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: `The email "${email}" doesn't exist` });
        }

        // Compare passwords
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Password incorrect" });
        }

        // Create and send token
        const token = createToken(user.email);
        res.cookie('jwtl', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
