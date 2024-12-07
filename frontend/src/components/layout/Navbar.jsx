import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, BookmarkCheck, Search, LogOut } from 'lucide-react';

export const Navbar = ({ showBookmarks, setShowBookmarks }) => {
    const { logout } = useAuth();
    const { isDark, setIsDark } = useTheme();

    return (
        <nav className={`w-full border-b ${isDark ? 'bg-[#1a1f2e] border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        QuantaSight
                    </h1>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowBookmarks(!showBookmarks)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                isDark
                                    ? 'text-gray-300 hover:bg-gray-800'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {showBookmarks ? (
                                <>
                                    <Search className="h-5 w-5" />
                                    <span>Search</span>
                                </>
                            ) : (
                                <>
                                    <BookmarkCheck className="h-5 w-5" />
                                    <span>Bookmarks</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`p-2 rounded-lg transition-colors ${
                                isDark
                                    ? 'text-gray-300 hover:bg-gray-800'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        <button
                            onClick={logout}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                isDark
                                    ? 'text-red-400 hover:bg-gray-800'
                                    : 'text-red-600 hover:bg-gray-100'
                            }`}
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
