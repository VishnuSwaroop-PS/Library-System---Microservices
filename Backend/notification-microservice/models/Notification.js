const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['due_date', 'new_arrival', 'reminder'], required: true },
    date: { type: Date, default: Date.now },
    isSent: { type: Boolean, default: false },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
