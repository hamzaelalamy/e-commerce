//protect
exports.protect = async(req,res,next) =>{
    //read the token and check if exist
    const testToken = req.headers.authorization
    let token;
    if(testToken && testToken.startsWith('Bearer')){
        token = testToken.split(' ')[1];
    }
    if(!token){
        return res.status(400).json('You are not logged in!');
    }
    console.log(token);
    //vslidate token 
    const decodedtoken = util.promisify(jwt.verify)(token , 'Ismail@2003#UAR05#UBA#06');
    console.log(decodedtoken);
    //if the user Exist 
    const user = await User.findById(decodedtoken.id);
    if(!user){
        return res.status(401).json('this user with given token does not exist');
    }
    req.user = user
    next()
}
//role:
exports.restrict = (role)=>{
    return(req,res,next)=>{
        if(req.user.role !== role){
            return res.status(403).json('You do not have permission!');
        }
        next();
    }
}