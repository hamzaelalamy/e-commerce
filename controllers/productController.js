const Product = require('../models/products');

module.exports.create = async (req, res, next) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        });
        await product.save();
        console.log('Product saved');
        res.status(201).json({ message: 'Product has been added', data: product });
    } catch (err) {
        console.error("Error in saving a product to database", err);
        next(err); // Pass the error to the next middleware
    }
};

module.exports.products = async (req, res, next) => {
    try {
        const allProduct = await Product.find({});
        console.log('Products found ', allProduct);
        res.status(200).json(allProduct);
    } catch (err) {
        console.log('Could not find products');
        next(err);
    }
};

module.exports.singleProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product)
            return res.status(404).json({ message: 'No product with this ID was found' });
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

module.exports.update = async (req, res, next) => {
    const id = req.params.id;
    const updateInfo = req.body;
    try {
        const updatedProd = await Product.findByIdAndUpdate(id, updateInfo, { new: true });
        if (updatedProd) {
            console.log("Updated product successfully");
            res.status(200).json({ message: "Update successfully!", data: updatedProd });
        } else {
            res.status(404).json({ message: "No such product is present or the fields you are trying to update are incorrect." });
        }
    } catch (err) {
        next(err);
    }
};

module.exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        console.log(`${id} is deleted`);
        res.status(200).json({ message: `${id} is deleted from our database.` });
    } catch (err) {
        next(err);
    }
};

module.exports.patch = async (req, res, next) => {
    const id = req.params.id;
    const updateInfo = req.body;
    try {
        const patchedProduct = await Product.findByIdAndUpdate(id, updateInfo, { new: true });
        if (patchedProduct) {
            console.log(id, "is patched");
            res.status(200).json({ message: 'Patch successfully!', data: patchedProduct });
        } else {
            console.log('The product was not found');
            res.status(404).json({ message: 'The product you are trying to patch does not exist.' });
        }
    } catch (err) {
        next(err);
    }
};