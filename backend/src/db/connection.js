const mysql = require('mysql2/promise');

const createConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Test the connection
        await connection.ping();
        return connection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

module.exports = { createConnection };
