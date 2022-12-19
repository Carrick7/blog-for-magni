import db from '../../../utils/db';
import User from '../../../models/userModel';
const { validateUserName, validateEmail, validatePassword } = require('../../../utils/regex');
const bcrypt = require('bcryptjs');

export default async function createAdmin(req, res) {
    
    //parsing out the body for relevant input 
    const { userName, email, password, isAdmin } = req.body;

    //ensuring db is connected
    await db.connect();
      
    //Validation to ensure that all fields are filled out
    if (!userName || !email || !password ) {
     return res.status(400).send(
      {message: 'Please fill out all fields'});
    }

    //Check if user email exists
    const emailExists = await User.findOne({ email });
     if (emailExists) {
      return res.status(400).send(
      {message: 'email is already in use'});
    }

    //Check userName exists
    const userNameExists = await User.findOne({ userName });
     if (userNameExists) {
      return res.status(400).send(
      {message: 'user name is already in use'});
    }

    //validation userName
    if(!userName.match(validateUserName)){
     return res.status(400).send(
      {message: 'user name needs to be between 3 - 12 characters long with no spaces'});
    }

    //validation email
    if(!email.match(validateEmail)){
      return res.status(400).send(
        {message: 'email is invalid'});
    }

    if(!password.match(validatePassword)){
      return res.status(400).send(
        {message: 'password must be at least 8 characters long with at least 1 special character, 1 uppercase letter, 1 lowercase letter and 1 number'});
    }

    //Hash pass
     const salt = await bcrypt.genSalt(10);
     const hashed_password = await bcrypt.hash(password, salt);

     //Creating new document in collection
     const createdUser = await User.create({ 
        userName, email, password: hashed_password, isAdmin
     });
    
     await db.disconnect();
     return res.status(201).json({ createdUser });
  }