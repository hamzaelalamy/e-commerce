const User = require('../models/users');
require('dotenv').config();

module.exports.getAllUsers = async (req, res) => {
    try {
        
        const users = await User.find({});


        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }


        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        next(err);
    }
};


module.exports.updateUser = async (req, res, next) => {
    const id = req.params.id;
    const updateInfo = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateInfo, { new: true });
        if (updatedUser) {
            console.log("Updated user successfully");
            res.status(200).json({ message: "Update successful!", data: updatedUser });
        } else {
            res.status(404).json({ message: "No such user is present or the fields you are trying to update are incorrect." });
        }
    } catch (err) {
        next(err);
    }
};

module.exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        console.log(`${id} is deleted`);
        res.status(200).json({ message: `${id} is deleted from our database.` });
    } catch (err) {
        next(err);
    }
};

module.exports.user = async (req, res, next) =>{
    try{
        const ShowUsers = await User.find({});
        console.log('Users Stored: ', ShowUsers);
        res.status(201).json(ShowUsers);
    }catch (err) {
        console.log('Problem in found users');
        next(err);
    }
};


module.exports.modify = async (req, res, next) => {
    const id = req.params.id;
    const updateInfo = req.body;
    try {
        const patchedUser = await User.findByIdAndUpdate(id, updateInfo, { new: true });
        if(patchedUser) {
            console.log(id, "is patched");
            res.status(200).json({message: 'Patched successfully: ', data: patchedUser});
        } else {
            console.log("The user was not found");
            res.status(404).json({ message: "The user you are looking for doesn't exist."});
        }
    } catch (err){
        next(err);
    }   
       
};


module.exports.singleUser = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try{
        const suser = await User.findById(id);
        console.log(suser);
        if(!suser)
            return res.status(404).json({ message: 'No user with this ID was found' });
        return res.status(200).json(suser);
    }catch (err) {
        next(err);
    }
};
