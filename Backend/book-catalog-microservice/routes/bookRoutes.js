const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Create a new book
router.post('/books', async (req, res) => {
    try {
        const { title, author, genre, available } = req.body;
        const newBook = new Book({ title, author, genre, available });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a book
router.put('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a book
router.delete('/books/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Search books
router.get('/books/search', async (req, res) => {
    try {
        const { title, author, genre } = req.query;
        const query = {};
        if (title) query.title = new RegExp(title, 'i');
        if (author) query.author = new RegExp(author, 'i');
        if (genre) query.genre = new RegExp(genre, 'i');
        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
