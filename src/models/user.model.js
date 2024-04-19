const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    enum:['user','admin']
  }
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
