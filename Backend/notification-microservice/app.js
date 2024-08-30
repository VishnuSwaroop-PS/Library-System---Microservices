const express = require('express');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/NotificationRoutes'); // Ensure this path is correct
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
}));
// API Routes
app.use('/api/notifications', notificationRoutes);

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
