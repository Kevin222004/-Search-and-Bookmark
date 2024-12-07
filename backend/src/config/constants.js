module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    JWT_EXPIRY: '24h',
    SALT_ROUNDS: 1,
};
