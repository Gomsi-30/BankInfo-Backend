import User from "../models/userModel.js";
import {giveToken} from "../features/giveToken.js";
export const allUsers = async (req, res) => {
    let { search } = req.query;
    console.log(typeof search);

    if (!search || search.trim() === '') {
        const allUsers = await User.find({}).populate('banks');
        return res.send(allUsers);
    }
    const users = await User.find({
        $or: [
            { username: { $regex: `^${search}`, $options: 'i' } }, 
            { 'banks.accountNumber' : search } 
        ]
    }).populate('banks');

    return res.send(users);
};


export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    
    if(user.password !== password) {
        return res.status(401).send({ message: "Invalid email or password" });
    }

    giveToken(user, 200, res);
}
