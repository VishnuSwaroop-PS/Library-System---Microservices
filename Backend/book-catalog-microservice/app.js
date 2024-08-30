const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Ensure the correct path to your `db.js` file
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');


require('dotenv').config();  // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
}));

// Routes
app.use('/api', bookRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
