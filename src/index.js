import express from 'express';
import { connectDB } from './config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import bankRoutes from './routes/bankRoutes.js';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
connectDB();

app.use(express.json());
app.use(userRoutes)
app.use(bankRoutes)
app.use(adminRoutes)

app.listen(3001, () => {
  console.log('Server started on port 3001');
})