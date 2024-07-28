import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//login user
const loginUser = async(req,res) => {
    const {email,password} = req.body;
    try {
    const user = await userModel.findOne({email})
    if(!user) {
        return res.json({success:false,message:"User doesn't exist"});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.json({success:false,message:"Login failed! Please check your email and password."});
    }

    const token = createToken(user._id);
    res.json({success:true,token});
    } catch (err) {
        console.log(err);
        res.json({success:false,message:"Failed to login. Please try again later."});
    }
    
}

//register user
const registerUser = async(req,res) => {
    const {name,email,password} = req.body;
    try {
        const exists = await userModel.findOne({email})
        if(exists) {
            res.json({success:false,message:"User with this email already exists"})
        }

        if(!validator.isEmail(email)) {
            res.json({success:false,message:"Enter a valid Email"})
        }

        if(password.length<8) {
            res.json({success:false,message:"Enter a strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (err) {
        console.log(err);
        res.json({success:false,message:"Registration unsuccessful. Please try again later."});
    }

}

export {loginUser,registerUser};
