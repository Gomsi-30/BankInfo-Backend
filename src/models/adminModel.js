import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    trim: true,   
  },
  password: {
    type: String,
    required: true, 
    trim: true,   
  },
 
}, {
  timestamps: true 
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
