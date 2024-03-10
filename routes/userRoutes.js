const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const userController = require('../controllers/userControllers');


router.get('/', userController.getAllUsers);

router.patch('/:id', userController.modifyUser);

router.get('/:id', userController.getSingleUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
