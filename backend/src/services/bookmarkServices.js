const { createConnection } = require('../db/connection');

class BookmarkService {
    async addBookmark(userId, resultId) {
        const connection = await createConnection();
        try {
            // Check if bookmark already exists
            const [existing] = await connection.execute(
                'SELECT * FROM bookmarked_results WHERE user_id = ? AND result_id = ?',
                [userId, resultId]
            );

            if (existing.length > 0) {
                // If bookmark exists, remove it
                await connection.execute(
                    'DELETE FROM bookmarked_results WHERE user_id = ? AND result_id = ?',
                    [userId, resultId]
                );
                return { success: true, action: 'removed' };
            }

            // If bookmark doesn't exist, add it
            await connection.execute(
                'INSERT INTO bookmarked_results (user_id, result_id) VALUES (?, ?)',
                [userId, resultId]
            );
            return { success: true, action: 'added' };
        } catch (error) {
            throw error;
        } finally {
            await connection.end();
        }
    }

    async getBookmarks(userId) {
        const connection = await createConnection();
        try {
            const [bookmarks] = await connection.execute(
                `SELECT r.* FROM results r
                 INNER JOIN bookmarked_results br ON r.id = br.result_id
                 WHERE br.user_id = ?`,
                [userId]
            );
            return bookmarks;
        } catch (error) {
            throw error;
        } finally {
            await connection.end();
        }
    }
}

module.exports = new BookmarkService();
