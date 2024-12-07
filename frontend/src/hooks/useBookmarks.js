import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBookmarks = async () => {
        try {
            setLoading(true);
            const data = await api.get('/bookmarks');
            setBookmarks(data);
        } catch (err) {
            console.error('Fetch bookmarks error:', err);
            setError('Failed to fetch bookmarks');
        } finally {
            setLoading(false);
        }
    };

    const toggleBookmark = async (resultId) => {
        try {
            setLoading(true);
            await api.post('/bookmarks', { resultId });
            await fetchBookmarks();
        } catch (err) {
            console.error('Toggle bookmark error:', err);
            setError('Failed to toggle bookmark');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    return { bookmarks, loading, error, toggleBookmark };
};
