const { createConnection } = require('../db/connection');

class SearchService {
    async search(searchTerm, category) {
        const connection = await createConnection();
        try {
            let query = 'SELECT * FROM results WHERE 1=1';
            const params = [];

            if (searchTerm) {
                query += ' AND (title LIKE ? OR description LIKE ?)';
                params.push(`%${searchTerm}%`, `%${searchTerm}%`);
            }

            if (category && category !== 'All Categories') {
                query += ' AND category = ?';
                params.push(category);
            }

            const [results] = await connection.execute(query, params);
            return results;
        } catch (error) {
            throw error;
        } finally {
            await connection.end();
        }
    }
}

module.exports = new SearchService();
