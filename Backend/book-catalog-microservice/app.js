const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Ensure the correct path to your `db.js` file
const bookRoutes = require('./routes/bookRoutes');

require('dotenv').config();  // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', bookRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
