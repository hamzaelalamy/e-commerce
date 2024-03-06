const user = require("../models/users")



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


module.exports.modify = async (req, res, next) => {
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


module.exports.singleUser = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try{
        const suser = await user.findById(id);
        console.log(suser);
        if(!suser)
        return res.status(404).json({ message: 'No user with this ID was found' });
    return res.status(200).json(suser);
    }catch (err) {
        console.log("fdghhggh");
        next(err);
    }
};