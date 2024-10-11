import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import admin from 'firebase-admin';
import { connectDB } from './config/database.js';
import dotenv from 'dotenv';
import User from './models/userModel.js'; // Import the User model
import Admin from './models/adminModel.js';

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Escape characters replacement
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_CERT_URL,
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'learning-ee744.appspot.com'
});

const bucket = admin.storage().bucket();
const app = express();
const PORT = 3001;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
connectDB();

// admin route
app.get('/dashboardData', async (req, res) => {
    const users = await User.find()
   
    return res.send(users);
  });

  app.post('/adminlogin', async (req, res) => {
    console.log(req.body)
    const { name, password } = req.body;
  
    const admin = await Admin.findOne({name})
 
    if(admin.password!=password){
        return res.status(400).json({ unauthorize: 'Incorrect details' });
    }
   
    return res.send(admin);
  });
  
// File upload endpoint
app.post('/upload', async (req, res) => {
  console.log('Uploading...');

  // Check if files are uploaded
  if (!req.files || !req.files.images) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  // Get the name and socialMediaHandle from the form data
  const { name, socialMediaHandle } = req.body;

  if (!name || !socialMediaHandle) {
    return res.status(400).json({ error: 'Name and social media handle are required' });
  }

  const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
  const uploadedImages = [];

  try {
    for (const file of files) {
      const blob = bucket.file(file.name);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (err) => {
        console.error('Error uploading to Firebase:', err);
        return res.status(500).json({ error: 'Failed to upload file to Firebase Storage' });
      });

      blobStream.on('finish', async () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`;
        uploadedImages.push(publicUrl);

        // Once all images are uploaded
        if (uploadedImages.length === files.length) {
          try {
            // Create a new user and save to the database
            const newUser = new User({
              name,
              socialHandle: socialMediaHandle,
              imageUrls: uploadedImages,
            });

            await newUser.save(); // Save the user to MongoDB
            console.log(newUser.imageUrls)
            // Send response including the saved user
            res.json({
              message: 'Files uploaded successfully and user data saved',
              imageUrls: newUser.imageUrls, // Send back the saved user data
            });
          } catch (error) {
            console.error('Error saving user to MongoDB:', error);
            return res.status(500).json({ error: 'Failed to save user data' });
          }
        }
      });

      blobStream.end(file.data);
    }
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/',(req,res)=>{
  res.send('hello world')
})
// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;