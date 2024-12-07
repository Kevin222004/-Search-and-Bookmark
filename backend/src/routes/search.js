const express = require('express');
const router = express.Router();
const searchService = require('../services/searchServices');

router.get('/', async (req, res) => {
    try {
        const { term, category } = req.query;
        const results = await searchService.search(term, category);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
