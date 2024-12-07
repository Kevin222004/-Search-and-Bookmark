const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createConnection } = require('../db/connection');
const { JWT_SECRET, JWT_EXPIRY, SALT_ROUNDS } = require('../config/constants');

class AuthService {
    async register(email, password) {
        let connection;
        try {
            connection = await createConnection();
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            // First check if user exists
            const [existingUsers] = await connection.execute(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );

            if (existingUsers.length > 0) {
                throw new Error('User already exists');
            }

            const [result] = await connection.execute(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                [email, hashedPassword]
            );

            const userId = result.insertId;
            const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

            return {
                success: true,
                token,
                user: {
                    id: userId,
                    email
                }
            };
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        } finally {
            if (connection) {
                try {
                    await connection.end();
                } catch (err) {
                    console.error('Error closing connection:', err);
                }
            }
        }
    }

    async login(email, password) {
        let connection;
        try {
            connection = await createConnection();
            const [users] = await connection.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (users.length === 0) {
                throw new Error('Invalid credentials');
            }

            const valid = await bcrypt.compare(password, users[0].password);
            if (!valid) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign(
                { id: users[0].id },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRY }
            );

            return {
                token,
                user: {
                    id: users[0].id,
                    email: users[0].email
                }
            };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            if (connection) {
                try {
                    await connection.end();
                } catch (err) {
                    console.error('Error closing connection:', err);
                }
            }
        }
    }
}

module.exports = new AuthService();
