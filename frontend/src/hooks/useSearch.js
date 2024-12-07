import { useState, useEffect } from 'react';
import { searchService } from '../services/searchService';

export const useSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const search = async (term = '', category = '') => {
        try {
            setLoading(true);
            setError(null);
            const data = await searchService.search(term, category);
            setResults(data);
        } catch (err) {
            console.error('Search error:', err);
            setError('Search failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        search();
    }, []);

    return { results, loading, error, search };
};
