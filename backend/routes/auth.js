import express from "express"
import bcrypt from "bcrypt"
import userModel from '../models/user.js'
import jwt from 'jsonwebtoken'
import { jwtSecret } from "../config/key.js";

const router = express.Router()

router.post("/register", async (req,res) => {
    const { user, pwd} = req.body;
    if(!user && !pwd) return res.status(400).json({"msg":"nigga put type ur name and password"})

    const duplicate = await userModel.findOne({ 'username': user })
    if(duplicate) return res.status(409).json({"error":`${user} alread exists`});

    try {
        // encrypt password
        const hashedPassword = await bcrypt.hash(pwd, 1)
        const newUser = await userModel.create({'username': user, 'pwd':hashedPassword});
        await newUser.save();
        console.log({'username': user, 'pwd':hashedPassword})
        res.status(201).json({"success":"new user was added"})
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
})

router.post("/login", async (req,res)=>{
    const { user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({"msg":"nigga put type ur name and password"})

    const foundUser = await userModel.findOne({ 'username': user })
    if(!foundUser) return res.status(409).json({"error":`${user} doesnt exist`});

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.pwd)
    if(match){
        const token = jwt.sign(
            { id: foundUser._id, username: foundUser.username }, 
            jwtSecret, 
            { expiresIn: 30 }
        );
        res.json({ token });
        res.json({'success':`User ${user} is logged in!`})
    }else{
        res.sendStatus(401)
    }
})




export default router;
