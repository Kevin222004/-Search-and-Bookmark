const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'userpassword',
    database: process.env.DB_NAME || 'quantasight_search',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

module.exports = config;
