exports.updateUser = async (req, res, next) =>{
    try{
        // Mise à jour de l'utilisateur en fonction de son ID
       const updatedUser = await User.findByIdAndUpdate (req.user._id, req.body,{new: true});
        // Vérification si l'utilisateur est trouvé et mis à jour
        if (!updatedUser){
            return res.status(404).json({ message: "User not found."});
        }
        
        console.log('user Updated ', updatedUser );
        res.status(200).json(updatedUser);
    }catch (error){
        // Gestion des erreurs
        console.log('error while updating user', err);
        next(err);
    }
    
};

exports.deleteUser = async (req, res, next) =>{
    try{
        // Suppression de l'utilisateur en fonction de son ID
       const deletedUser = await User.findByIdAndDelete (req.params.id);
       // Vérification si l'utilisateur est trouvé et supprimé
       if (!deletedUser){
        return res.status(404).json({ message: "User not found."});
       }
       
       console.log('user deleted ', deletedUser );
        res.status(200).json(deletedUser);

    }catch (error){
        // Gestion des erreurs
        console.log('error while deleting user', err);
        next(err);
    }
    
};