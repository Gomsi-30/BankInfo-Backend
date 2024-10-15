import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    trim: true,   
  },
  email : {
    type : String,
    validate : [validator.isEmail, 'Please provide a valid email'], 
    required:true,
    unique : true,
  },
  role : {
    type : String,
    default : 'user',
  },
  banks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank'
  }],
  password :{
    type : String,
    required : [true, 'Password is required'],
  }
}, {
  timestamps: true 
});


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.jwtToken = function () {
  console.log('jwt called')
    const token = jwt.sign({_id:this._id},'secret',{expiresIn: '7d'});
    return token;
}

const User = mongoose.model('User', userSchema);

export default User;
