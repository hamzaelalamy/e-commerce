const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const crypto = require ('crypto');

const userSchema = new mongoose.Schema({
    name: {
      type: String, 
      required: [true,'Please Enter Your Name']
    },
    email: {type: String, 
      required: [true, "Please Enter Your Email"],
      unique: [true ,'Please Use Another Email']
    },
    age: {type: Number},
    password: {type: String, required:true},
    // confirmPassword: {
    //     type: String,
    //     required: [true, 'Please enter Confirm password'],
    //     validate: {
    //         validator: function (val) {
    //             return val === this.password;
    //         },
    //         message: 'Password & Confirm Password do not match'
    //     }
    // },
    role: {type:String, enum:['admin','user'],  default:'user'} ,
    photo: String,
    passwordResetToken :String,
    passwordResetTokenExpires:Date,
  },
  {timestamps : true}
  );
  
    //Hash password before insert to DB
    userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();
      try {
          const hashedPassword = await bcrypt.hash(this.password, 10);
          this.password = hashedPassword;
          this.confirmPassword = undefined; 
          next();
      } catch (error) {
          next(error);
      }
  });

  //compaer || check password
  userSchema.methods.comparePasswordInDb = async function(pswd, pswdDB) {
    return await bcrypt.compare(pswd, pswdDB);
  };

  //random token for forgot password:
  userSchema.methods.createResetPasswordToken =  function (){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() +10601000;
    console.log(resetToken,this.passwordResetToken);
    return resetToken
  }

module.exports = mongoose.model("User", userSchema);