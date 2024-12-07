const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function initializeDatabase() {
    let connection;
    let retries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (retries > 0) {
        try {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });

            console.log('Connected to database successfully');

            // Read schema file
            const schemaPath = path.join(__dirname, '../db/schema.sql');
            const schema = await fs.readFile(schemaPath, 'utf8');

            // Execute schema statements
            const statements = schema
                .split(';')
                .filter(statement => statement.trim().length > 0);

            for (const statement of statements) {
                await connection.query(statement);
            }

            console.log('Database schema initialized successfully');
            await connection.end();
            return;

        } catch (error) {
            console.log(`Failed to connect, retries left: ${retries}`);
            retries--;

            if (connection) {
                try {
                    await connection.end();
                } catch (closeError) {
                    console.error('Error closing connection:', closeError);
                }
            }

            if (retries === 0) {
                throw error;
            }

            await delay(5000); // Wait 5 seconds before retrying
        }
    }
}

module.exports = initializeDatabase;
