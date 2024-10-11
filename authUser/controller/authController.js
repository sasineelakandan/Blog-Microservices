import User from '../model/userModel.js'
import pkg from 'bcryptjs';
import bcrypt from 'bcryptjs'
const { genSalt, hash ,} = pkg;
import jwt from'jsonwebtoken'
import { JWT_KEY } from '../utils/config.js';
import produce from '../kafka/producer.js'






export const Signup = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, phoneNumber, termsAccepted } = req.body;

    if (!termsAccepted) {
      return res.status(400).json({ error: 'Terms and conditions must be accepted' });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

   
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

  
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    });

    await newUser.save();

    
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_KEY,
      { expiresIn: '1h' }
    );

    // Send response with token in httpOnly cookie
    res.status(200).cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 1 day
    }).send({
      message: 'User registered successfully!',
      token,
    });
    
    await produce("add-user", JSON.stringify(req.body));
   

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};




export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ userVer: false, message: 'User not found' });
    }

    // Verify password
    const passwordVer = await bcrypt.compare(password, user.password);

    if (!passwordVer) {
      return res.status(401).send({ passVer: false, message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_KEY,
      { expiresIn: '1h' }
    );

    // Send response with token in httpOnly cookie
    res.status(200).cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 1 day
    }).send({
      message: 'Login successful!',
      token,
      userVer: true,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



