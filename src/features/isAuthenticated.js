import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async function (req, res, next) {
    console.log('called authentication')
    const token = req.cookies.token;
    console.log(token)
    console.log(token)
    if (!token) {
        return res.status(401).send({ message: "Token not found" });
    }
    const decodedToken = jwt.verify(token, "secret");
    const user = await User.findById(decodedToken._id);
    console.log(user)
    if(!user){
        return res.status(401).send({ message: "Token is mismatched" });
    }
    req.user = user;
    next();
}