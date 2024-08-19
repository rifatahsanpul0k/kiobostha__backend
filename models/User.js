// Description: Model for User.
// The model is created using mongoose. The model is used to create a new user in the database. 
// The password is hashed using bcrypt before saving it in the database.
// The model also has a method comparePassword which is used to compare the password entered by the user with the hashed password in the database.
// The model is exported to be used in the authController.js file.

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");




const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password,this.password); // this.password is the hashed password
}

module.exports = mongoose.model('User',userSchema); // User is the name of the model and userSchema is the schema of the model