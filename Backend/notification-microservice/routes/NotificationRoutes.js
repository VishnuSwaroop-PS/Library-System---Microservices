const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new notification
router.post('/', async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a notification
router.put('/:id', async (req, res) => {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNotification);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a notification
router.delete('/:id', async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notification deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
