const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const quizRoutes = require('./routes/quizRoutes.js');
const cookieParser = require('cookie-parser');
const seedAdmin = require('./seedAdmin.js');
const multer = require('multer');

dotenv.config();

async function startServer() {
  try {
    await connectDB();
    const app = express();

    app.use(express.json()); 
    app.use(express.urlencoded({ extended: true }));
    
    // Multer does not work with JSON middleware for files
   // Ensure files can be parsed
    
    app.use(cookieParser());

    const corsOptions = {
      origin: 'http://localhost:5173',
      credentials: true,
    };

    app.use(cors(corsOptions));
    app.use((req, res, next) => {
      console.log("📢 Incoming request:", req.method, req.url);
      next();
  });
  
    seedAdmin();

    app.use('/auth', authRoutes);
    app.use('/user', userRoutes);
    app.use('/quiz', quizRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Error starting server:', error);
    
  }
}

startServer();
