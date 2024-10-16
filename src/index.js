import express from 'express';
import { connectDB } from './config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import bankRoutes from './routes/bankRoutes.js';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = ['https://wondrous-fenglisu-cde1b5.netlify.app']; 

app.use(cors({
  origin: function (origin, callback) {
  
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true 
}));


app.get('/',(req,res)=>{
  res.send('hello')
})
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(userRoutes)
app.use(bankRoutes)
app.use(adminRoutes)

app.listen(3001, () => {
  console.log('Server started on port 3001');
})

export default app;