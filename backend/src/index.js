const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const bookmarkRoutes = require('./routes/bookmarks');
const { authenticateToken } = require('./middleware/auth');
const initializeDatabase = require('./config/dbInit');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors({
    origin: '*', // In production, replace with specific origins
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Routes
app.use('/auth', authRoutes);
app.use('/search', authenticateToken, searchRoutes);
app.use('/bookmarks', authenticateToken, bookmarkRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Function to start server
async function startServer() {
    try {
        // Initialize database
        await initializeDatabase();

        // Start server
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`Database host: ${process.env.DB_HOST}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start the server
startServer();

module.exports = app; // For testing purposes
