import { giveToken } from "../features/giveToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    console.log('fn called');
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).send({ message: "User already exists" });
     }
    const newuser = await User.create({...req.body})
   
   console.log(newuser);
   
   giveToken(newuser,201,res)
}

export const loginUser = async (req, res) => {
   const {email, password} = req.body;

   const user = await User.findOne({ email });

   if (!user) {
       return res.status(401).send({ message: "Invalid email or password" });
   }
   if(email!=='admin@gmail.com'){
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
        return res.status(401).send({ message: "Invalid email or password" });
    }
   }
   if(password!==user.password){
     return res.status(401).send({ message: "Invalid email or password" });
   }
   giveToken(user, 200, res);
}
