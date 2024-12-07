import React from 'react';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ResultCard = ({ result, isBookmarked, onBookmark }) => {
    const { isDark } = useTheme();

    return (
        <div className={`rounded-lg transition-all duration-200 p-6 ${
            isDark
                ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700'
                : 'bg-white hover:shadow-lg border border-gray-200'
        }`}>
            <div className="flex justify-between items-start">
                <h2 className={`text-xl font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                }`}>
                    {result.title}
                </h2>
                <button
                    onClick={() => onBookmark(result.id)}
                    className={`transition-colors ${
                        isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                >
                    {isBookmarked ? (
                        <BookmarkCheck className="h-5 w-5 text-indigo-500" />
                    ) : (
                        <BookmarkPlus className="h-5 w-5" />
                    )}
                </button>
            </div>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {result.description}
            </p>
            <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                    isDark
                        ? 'bg-gray-700 text-indigo-400'
                        : 'bg-indigo-100 text-indigo-800'
                }`}>
                    {result.category}
                </span>
                {result.author && (
                    <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        By {result.author}
                    </span>
                )}
            </div>
        </div>
    );
};
