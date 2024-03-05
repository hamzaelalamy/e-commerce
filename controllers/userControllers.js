const user = require("../models/users")

module.exports.create = async (req, res, next) => {
    try{
        const user = new user({
            name: req.body.name,
            email: req.body.email,
            age : req.body.age,
            role : req.body.role
        });
        await user.save();
        console.log('User saved successfully');
        res.status(201).json({ message: 'User has been added', data : user })
    }catch{
        console.error("Error is saving a User to database", err);
        nexr(err);
    }
}

module.exports.user = async (req, res, next) =>{
    try{
        const ShowUsers = await user.find({});
        console.log('Users Stored: ', ShowUsers);
        res.status(201).json(ShowUsers);
    }catch (err) {
        console.log('Problem in found users');
        next(err);
    }
};


module.exports.patch = async (req, res, next) => {
    const id = req.params.id;
    const updateInfo = req.body;
    try {
        const patchedUser = await user.findByIdAndUpdate(id, updateInfo, { new: true });
        if(patchedUser) {
            console.log(id, "is patched");
            res.status(200).json({message: 'Patched successfully: ', data: patchedUser});
        } else {
            console.log("The user was not found");
            res.status(404).json({ message: "The user you are looking for deosn't exist."});
        }
    }catch (err){
        next(err);
    }
       
};