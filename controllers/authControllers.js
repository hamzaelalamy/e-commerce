// const {requireAuth} = require('../middleware/authMiddleware');
const User  = require('../models/users');
const jwt  = require('jsonwebtoken');
// const util  = require('util');
require('dotenv').config();
const sendEmail = require('./Utils/email');


//token function
const signToken  = id =>{
    return  jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn:'30d'
    });
};


exports.signup = async (req, res, next) => {
    try {
        let email = req.body.email;
        const FindUser = await User.findOne({email:email});
        if(FindUser){
            res.status(403).json({message:"Invalid Email"});
        }
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id);
        res.status(201).json({
            token,
            data: {
                user: newUser
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: 'Validation Error', messages: validationErrors });
        }
        console.error(error);
        res.status(500).json({ error: 'Server Error', message: 'An error occurred while processing your request' });
    }
}

//login
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Bad Request', message: 'Please provide both email and password' });
    }

    try {
        const user = await User.findOne({ email: email }).select('+password');
        if (!user || !(await user.comparePasswordInDb(password, user.password))) {
            return res.status(401).json({ error: 'Unauthorized', message: 'Incorrect email or password' });
        }

        const token = signToken(user._id);
        // Don't send the user password back in the response
        delete user.password;

        res.status(200).json({
            status: 'Successfully',
            token: token,
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: 'An error occurred while processing your request' });
    }
}

//forgot password :
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found', message: 'No user with this email' });
        }

        const resetToken = user.createResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;
        const message = `We have received a password reset request. Please use the below link to reset your password:\n\n${resetUrl}\n\nThis reset link will be valid only for 10 minutes.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Change Request Received',
                message: message
            });
            
            return res.status(200).json({
                message: 'Password reset link sent to the user email'
            });
        } catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined;
            await user.save({ validateBeforeSave: false });
            console.error(error);
            return res.status(500).json({ error: 'Email Sending Error', message: 'There was an error sending the password reset email. Please try again later.' });
            // next(err);
        }
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error', message: 'An error occurred while processing your request' });
    }
}
