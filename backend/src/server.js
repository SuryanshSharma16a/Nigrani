const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

// Routes
// Note: Assuming route files exist in the routes directory
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/institutions', require('./routes/institutionRoutes'));
app.use('/api/inspections', require('./routes/inspectionRoutes'));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
