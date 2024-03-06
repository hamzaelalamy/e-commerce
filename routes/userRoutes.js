const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const userController = require('../controllers/userControllers');


router.get('/', userController.user);

router.patch('/:id', userController.modify);

router.get('/:id', userController.singleUser);


module.exports = router;
