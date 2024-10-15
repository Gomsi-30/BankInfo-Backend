import express from 'express';
import { connectDB } from './config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import bankRoutes from './routes/bankRoutes.js';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
export const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: 'https://wondrous-fenglisu-cde1b5.netlify.app', // Netlify domain
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Allow credentials (like cookies)
};

app.use(cors(corsOptions));
connectDB();

app.use(express.json());
app.get('/',(req,res)=>{
  res.send('hello')
})
app.use(userRoutes)
app.use(bankRoutes)
app.use(adminRoutes)

app.listen(3001, () => {
  console.log('Server started on port 3001');
})