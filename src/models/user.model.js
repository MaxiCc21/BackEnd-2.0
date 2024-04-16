const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  docType: {
    type: String,
    enum: ['DNI',"D.N.I", 'Pasaporte'], 
    required: true
  },
  docNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status:{
    type: String,
    default: "user",
    enum:['user','Admin']
  }
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
