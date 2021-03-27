import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        //checking if the user exists or not
        if (!existingUser) {
            return res.status(404).json({ message: "User does'nt exist. " })
        }
        //if exists then check the password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials. " });
        }

        //if password correct then assign json web tokenKey (test is the secret key (optional) and also we have an option object that tells us in how much time will the token expire )
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        //checking if the user exists or not
        if (existingUser) {
            return res.status(400).json({ message: "User already exist. " })
        }

        //if user deos not exist create one but first check if confirm and password are same or note

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match" })
        }

        //if passwords match now we need to hash the passwords
        //12 is the salting ,level of difficult that you want to use
        const hashedPassword = await bcrypt.hash(password, 12);

        //creating the user
        const result = await user.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        //now creating the token after creating the user
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}