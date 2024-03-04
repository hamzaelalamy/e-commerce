const express = require('express');
// const { signup_get, login_get, signup_post, login_post } = require('../controllers/authController');
const router = express.Router();
const authController = require('../controllers/authController');
const {body, validationResult} = require('express-validator');
const {requireAuth} = require('../middleware/authMiddleware');

router.get('/signup',authController.signup_get);
router.get('/login', requireAuth,authController.login_get);
router.post('/signup',authController.signup_post);
router.post('/login',authController.login_post);

router.get('/logout', authController.logout);


module.exports = router;