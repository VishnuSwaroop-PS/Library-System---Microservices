const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://vishnuswaroop20:Rockstar%4012@cluster0.jdxb7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
