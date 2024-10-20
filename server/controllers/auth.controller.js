import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"
import nodemailer from "nodemailer"
import axios from "axios";
import {UserModel} from "../models/user.model.js";

const userMail = process.env.MAIL_USER
const userPassword = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    secureConnection : false,
    auth: {
        user: userMail,
        pass: userPassword,
    },
    tls : {
        rejectUnauthorized :true
    }
});

const login = async (req,res) => {
    const { email, password } = req.body;
    try{
        const user = await UserModel.findOne({ email });
        if(!user){
            // console.log("user not found")
            return res.status(404).json({ message: "User not found! Register first" });
        }

        if (!user.isVerified){
            await axios.delete(`http://localhost:4000/api/auth/delete-user/${user._id}`,{
                withCredentials: true
            })
            return res.status(401).json({ message: "Email not verified!" })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if (!isPasswordMatch){
            console.log("password incorrect")
            return res.status(400).json({ message: "Password incorrect" });
        }
        let token;
        try{
            token = jwt.sign({id: user._id}, process.env.SECRET, { expiresIn: '30d' });
        }catch (err) {
            console.log("JWT sign error:", err);
            return res.status(500).json({ message: "Error generating authentication token." });
        }
        res.cookie('token', token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        return res.status(200).json({message: "Login Successfully",token})
    }catch (error) {
        console.log(error)
        return res.status(500).json({ message : error})
    }
}

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const userExists = await UserModel.findOne({ email });
        if (userExists){
            return res.status(400).json({message: "User Already Exists"})
        }
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const mailOptions = {
            from: userMail,
            to: email,
            subject: `Kaushalam Verification Code`,
            text: `Welcome to Kaushalam! 🌟 Verify your email . Your verification code is: ${verificationCode}. Enjoy the journey! 📸✨`,
        };

        await transporter.sendMail(mailOptions);
        const newUser = new UserModel({ username,email,password,verificationCode});
        const savedUser = await newUser.save();


        return res.status(200).json({ message: "Verify your email", savedUser });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message : "Something went wrong",error})
    }
}

const logout = (req,res) => {
    res.clearCookie('token',{
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.status(200).json({ message: "Logout Successfully"});
}

const verify = async (req, res) => {
    const {email,verificationCode} = req.body;
    try{
        const user = await UserModel.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(user.verificationCode === verificationCode){
            user.isVerified = true;
            user.verificationCode = "";
            user.attempts = 0;
            const savedUser = await user.save();
            const token = jwt.sign({id: user._id},process.env.SECRET, {expiresIn: '1h'});
            res.cookie('token',token,{
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            return res.status(200).json({ message: "Registration done successfully",user: savedUser});
        }
        else{
            user.attempts += 1;
            await user.save();

            if(user.attempts >= 3){
                await UserModel.deleteOne({ email });
                return res.status(401).json({ message: "Verification Failed"});
            }
            else{
                return res.status(401).json({message: "Try Again"})
            }
        }
    }catch (error) {
        console.log(error)
        return res.status(500).json({message: "Something went Wrong"});
    }
}


const me = async (req, res) => {
    /*
        Function to get the logged-in user
        RETURNS : Current User
    */
    const user = req.user;
    res.status(200).json({ user });
}



const deleteUser = async (req,res) => {
    const { id } = req.params;
    try{
        await UserModel.findByIdAndDelete(id);
        res.status(201).json({ message: "Retry again!" })
    }catch (e) {

    }
}

export { login, register, logout, verify, me, deleteUser }