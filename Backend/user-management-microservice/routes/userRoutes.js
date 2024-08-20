const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Authenticate user and get token
router.post('/login', loginUser);

// Get user profile
router.get('/profile', protect, getUserProfile);

// Update user profile
router.put('/profile', protect, updateUserProfile);

// Delete user
router.delete('/:id', protect, deleteUser);

module.exports = router;
