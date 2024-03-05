const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers')
router.put('/:id', userController.updateUser)