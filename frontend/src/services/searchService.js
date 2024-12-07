import { api } from '../utils/api';

export const searchService = {
    search: async (term = '', category = '') => {
        const query = new URLSearchParams();
        if (term) query.append('term', term);
        if (category && category !== 'All Categories') query.append('category', category);
        return api.get(`/search?${query.toString()}`);
    }
};
