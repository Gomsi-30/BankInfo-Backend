import Bank from "../models/bankModel.js";
import User from "../models/userModel.js";


export const createBank = async (req, res) => {
    console.log('bank called')
    req.body.user = req.user._id;
    const bank = await Bank.create(req.body);
    const user = await User.findById(req.user._id);
    user.banks.push(bank._id);
    await user.save();
    return res.send(bank);
}

export const viewBanks = async (req, res) => {
    const banks = await Bank.find({ user: req.user._id });  
    return res.send(banks);
}

export const viewSingleBank = async (req, res) => {
    const bank = await Bank.findOne({_id: req.params.bankId});  
    return res.send(bank);
}

export const updateBank = async (req, res) => {
    try {
        const { bankId } = req.params;
        const updatedBank = await Bank.findByIdAndUpdate(
            bankId,
            req.body,
            { new: true, runValidators: true } 
        );

        if (!updatedBank) {
            return res.status(404).send({ message: "Bank account not found" });
        }

        return res.status(200).send(updatedBank);
    } catch (error) {
        return res.status(500).send({ message: "Error updating bank account", error: error.message });
    }
};


export const deleteBank = async (req, res) => {
    try {
        console.log('delete called');
        const { bankId } = req.params; 
        const deletedBank = await Bank.findByIdAndDelete(bankId);

        if (!deletedBank) {
            return res.status(404).send({ message: "Bank account not found" });
        }

        const user = await User.findById(req.user._id);
        const idx = user.banks.findIndex((i) => i._id.toString() === deletedBank._id.toString());

        
        if (idx !== -1) {
            user.banks.splice(idx, 1);
            await user.save();
        }

        return res.status(200).send({ message: "Bank account deleted successfully", deletedBank });
    } catch (error) {
        return res.status(500).send({ message: "Error deleting bank account", error: error.message });
    }
};