const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    phoneNu :
    {
        type:String,
        required:true

    },
    email:
    {
        type:String,
        required:true

    },
    password:
    {
        type:String,
        required:true

    },
    name:
    {
        type:String,
        required:true
    },
    desc:
    {
        type:String,
        required:true 
    },
    Admin:
    {
        type:Boolean,
        default: false
    }
});


userSchema.pre("save",function(next)
{
    bcrypt.genSalt(10)
    .then((salt)=>{

        bcrypt.hash(this.password,salt)
        .then((encryptPassword)=>{
            this.password = encryptPassword;
            next();
        })
        .catch(err=>console.log(`Error : ${err}`));
    })

    .catch(err=>console.log(`Error : ${err}`));
})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;