const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const bookmarkService = require('../services/bookmarkServices');

// Add bookmark
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { resultId } = req.body;
        if (!resultId) {
            return res.status(400).json({ error: 'Result ID is required' });
        }
        await bookmarkService.addBookmark(req.user.id, resultId);
        res.status(201).json({ message: 'Bookmark added successfully' });
    } catch (error) {
        console.error('Bookmark route error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all bookmarks
router.get('/', authenticateToken, async (req, res) => {
    try {
        const bookmarks = await bookmarkService.getBookmarks(req.user.id);
        res.json(bookmarks);
    } catch (error) {
        console.error('Get bookmarks route error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Remove bookmark
router.delete('/:resultId', authenticateToken, async (req, res) => {
    try {
        const { resultId } = req.params;
        await bookmarkService.removeBookmark(req.user.id, resultId);
        res.json({ message: 'Bookmark removed successfully' });
    } catch (error) {
        console.error('Remove bookmark route error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
