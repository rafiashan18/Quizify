const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const seedAdmin = require('./seedAdmin.js');
const bodyParser = require('body-parser');

// Routes 
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const quizRoutes = require('./routes/quizRoutes.js');
const quizRetreivalRoutes = require('./routes/quizRetrievalRoutes.js');
const userProgressRoutes = require('./routes/userProgressRoutes.js')
const paymentsRoutes = require('./routes/paymentsRoutes.js')
const dashboardStats = require('./routes/statRoutes')
const messageRoutes = require('./routes/messageRoutes.js')

dotenv.config();
connectDB();
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   console.log("Incoming Request:", req.method, req.url);
//   console.log("Headers:", req.headers);
//   console.log("Params:", req.params);
//   console.log("Body:", req.body);
//   next();
// });


app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});


seedAdmin();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/quiz', quizRoutes);
app.use('/quizRetrieval', quizRetreivalRoutes);
app.use('/userProgress',userProgressRoutes)
app.use('/stats',dashboardStats)
app.use('/payments', paymentsRoutes)
app.use('/message', messageRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
