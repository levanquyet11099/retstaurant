const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_user: { type: String , required: true ,unique: true} , 
  username: { type: String, required: true ,unique: true},
  password: { type: String, required: true },
  
});

const User = mongoose.model('User', userSchema,'users');

module.exports = User;