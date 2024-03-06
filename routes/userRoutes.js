const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const userController = require('../controllers/userControllers');


router.get('/', userController.user);

router.patch('/:id', userController.modify);

router.get('/:id', userController.singleUser);

// router.post('/create', [
//     body('name').notEmpty().isString(),
//     body('email').notEmpty().isString(),
//     body('number').notEmpty().isNumeric(),
//     body('role').notEmpty().isString(),
//     body('password').notEmpty().isString()
// ], validateRequest, "Smail-Smail-CreateUser.create");


module.exports = router;