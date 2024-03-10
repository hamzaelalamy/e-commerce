const User = require('../models/users');


module.exports.getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find({});

        // Check if there are no users found
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Return the retrieved users as a response
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.updateUser = async (req, res, next) => {
    const id = req.params.id;
    const updateInfo = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateInfo, { new: true });
        if (updatedUser) {
            console.log("Updated user successfully");
            res.status(200).json({ message: "Update successfully!", data: updatedUser });
        } else {
            res.status(404).json({ message: "No such user is present or the fields you are trying to update are incorrect." });
        }
    } catch (err) {
        next(err);
    }
};

module.exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        console.log(`${id} is deleted`);
        res.status(200).json({ message: `${id} is deleted from our database.` });
    } catch (err) {
        next(err);
    }
};

module.exports.getSingleUser = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try {
        const singleUser = await User.findById(id);
        if (!singleUser)
            return res.status(404).json({ message: 'No user with this ID was found' });
        return res.status(200).json(singleUser);
    } catch (err) {
        next(err);
    }};