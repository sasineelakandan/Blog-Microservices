import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\+?[0-9]{10,15}$/, 'Please provide a valid phone number.']
  },
  termsAccepted: {
    type: Boolean,
    
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;