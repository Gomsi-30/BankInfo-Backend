import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',  
      required: true 
    },
    ifscCode: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11
    },
    branchName: {
      type: String,
      required: true
    },
    bankName: {
      type: String,
      required: true
    },
    accountNumber: {
      type: Number,
      required: true,
      unique: true  
    },
    accountHolderName: {
      type: String,
      required: true
    }
  }, {
    timestamps: true  
  });

const Bank = mongoose.model.Bank || mongoose.model('Bank', bankSchema);

export default Bank;