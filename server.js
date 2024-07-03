// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const notebookRoutes = require('./routes/notebookRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/notebook', notebookRoutes);

const PORT = 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
