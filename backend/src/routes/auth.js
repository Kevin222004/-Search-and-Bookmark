const express = require('express');
const router = express.Router();
const authService = require('../services/authServices');

router.post('/register', async (req, res) => {
    try {
        console.log('Register request received:', req.body); // Add logging
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const result = await authService.register(email, password);
        res.status(201).json(result);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message || 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log('Login request received:', req.body); // Add logging
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const result = await authService.login(email, password);
        res.json(result);
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ error: error.message || 'Authentication failed' });
    }
});

module.exports = router;
