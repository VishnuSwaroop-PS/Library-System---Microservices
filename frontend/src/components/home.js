import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [available, setAvailable] = useState(true);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false); // Added state for notifications
    const [notifications, setNotifications] = useState([]); // State to store notifications

    // Fetch books on component mount
    useEffect(() => {
        fetchBooks();
    }, []);

    // Fetch all books
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/books');
            setBooks(response.data);
        } catch (err) {
            setError('Failed to fetch books');
        }
    };

    // Fetch all notifications
    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/notifications');
            setNotifications(response.data);
        } catch (err) {
            console.error('Failed to fetch notifications', err);
        }
    };

    // Handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
        setEditId(null);
        setTitle('');
        setAuthor('');
        setGenre('');
        setAvailable(true);
    };

    // Handle modal show
    const handleShowModal = (book = null) => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setGenre(book.genre);
            setAvailable(book.available);
            setEditId(book._id);
        }
        setShowModal(true);
    };

    // Create or update a book
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editId) {
                response = await axios.put(`http://localhost:5001/api/books/${editId}`, { title, author, genre, available });
                setSuccess('Book updated successfully');
                triggerNotification(`Book "${response.data.title}" updated.`, 'reminder');
            } else {
                response = await axios.post('http://localhost:5001/api/books', { title, author, genre, available });
                setSuccess('Book created successfully');
                triggerNotification(`Book "${response.data.title}" created.`, 'new_arrival');
            }
            fetchBooks();
            handleCloseModal();
        } catch (err) {
            setError(editId ? 'Failed to update book' : 'Failed to create book');
        }
    };

    // Delete a book
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/books/${id}`);
            setSuccess('Book deleted successfully');
            fetchBooks();
            triggerNotification(`A book has been deleted.`, 'reminder');
        } catch (err) {
            setError('Failed to delete book');
        }
    };

    // Search books
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5001/api/books/search', {
                params: { title: search }
            });
            setBooks(response.data);
        } catch (err) {
            setError('Failed to search books');
        }
    };

    // Function to trigger notifications
    const triggerNotification = async (message, type) => {
        try {
            await axios.post('http://localhost:5002/api/notifications', { message, type });
        } catch (err) {
            console.error('Failed to send notification', err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl text-blue-600 font-bold mb-6">Library Management</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {/* {success && <div className="text-green-500 mb-4">{success}</div>} */}

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Search
                    </button>
                </div>
            </form>

            {/* Table of Books */}
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border rounded-lg shadow-md">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="text-left px-6 py-4">Title</th>
                            <th className="text-left px-6 py-4">Author</th>
                            <th className="text-left px-6 py-4">Genre</th>
                            <th className="text-left px-6 py-4">Available</th>
                            <th className="text-left px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id} className="border-t">
                                <td className="px-6 py-4">{book.title}</td>
                                <td className="px-6 py-4">{book.author}</td>
                                <td className="px-6 py-4">{book.genre}</td>
                                <td className="px-6 py-4">{book.available ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button
                                        onClick={() => handleShowModal(book)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Notification Button */}
            <button
                className="bg-blue-500 text-white p-2 rounded-md fixed bottom-4 right-4"
                onClick={() => {
                    setShowNotifications(!showNotifications);
                    fetchNotifications();
                }}
            >
                Notifications
            </button>
                          {/* <div>{success}</div> */}
            {/* Notifications Display */}
            {showNotifications && (
                <div className="fixed bottom-16 right-4 bg-white border border-gray-300 shadow-lg p-4 w-80 max-h-64 overflow-y-scroll">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    {notifications.length > 0 ? (
                        <ul>
                            <li className="font-bold">Latest: {notifications[0]?.message}</li>
                            {notifications.slice(1).map((notification) => (
                                <li key={notification._id}>{notification.message}</li>
                            ))}
                        </ul>
                    ) : (
                       <p>{success}</p>
                    )}
                </div>
            )}

            {/* Floating Add Button */}
            <button
                onClick={() => handleShowModal()}
                className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none"
                title="Add New Book"
            >
                <span className="text-3xl">+</span>
            </button>

            {/* Modal for Adding/Editing Books */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4">{editId ? 'Edit Book' : 'Add Book'}</h3>
                        <form onSubmit={handleSave}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                    Author:
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                                    Genre:
                                </label>
                                <input
                                    type="text"
                                    id="genre"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="available" className="block text-sm font-medium text-gray-700">
                                    Available:
                                </label>
                                <input
                                    type="checkbox"
                                    id="available"
                                    checked={available}
                                    onChange={(e) => setAvailable(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    {editId ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
