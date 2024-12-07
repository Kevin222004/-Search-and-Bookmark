import { api } from '../utils/api';

export const bookmarkService = {
    getBookmarks: (token) => api.get('/bookmarks', token),
    addBookmark: (resultId, token) => api.post('/bookmarks', { resultId }, token),
    removeBookmark: (resultId, token) => api.delete(`/bookmarks/${resultId}`, token)
};
