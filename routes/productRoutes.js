const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const productController = require('../controllers/productController')

router.post('/create',[
    body('name').notEmpty().isString(),
    body('description').optional().isString(),
    body('price').notEmpty().isNumeric(),
    body('category').optional().isString()
], validateRequest, productController.create);

router.get('/', productController.products);

router.get('/:id', productController.singleProduct);

router.put('/edit/:id',[
    body('name').notEmpty().isString(),
    body('description').optional().isString(),
    body('price').notEmpty().isNumeric(),
    body('category').optional().isString()
], validateRequest, productController.update);

router.patch('/:id', productController.patch);

router.delete("/delete/:id", productController.delete);

router.get('/filter?', productController.filter)

module.exports = router;