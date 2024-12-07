import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Navbar } from './components/layout/Navbar';
import { MainLayout } from './components/layout/MainLayout';
import { SearchBar } from './components/search/SearchBar';
import { CategoryFilter } from './components/search/CategoryFilter';
import { ResultCard } from './components/search/ResultCard';
import { useSearch } from './hooks/useSearch';
import { useBookmarks } from './hooks/useBookmarks';
import {ThemeProvider} from "./context/ThemeContext.jsx";

const AppContent = () => {
    const { user } = useAuth();
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All Categories');
    const { results, loading, error, search } = useSearch();
    const { bookmarks, toggleBookmark } = useBookmarks();
    const [isLogin, setIsLogin] = useState(true);

    // Initial search when component mounts
    useEffect(() => {
        if (user) {
            search('', category);
        }
    }, [user]);

    const handleSearch = () => {
        const categoryToSearch = category === 'All Categories' ? '' : category;
        search(searchTerm, categoryToSearch);
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        const categoryToSearch = newCategory === 'All Categories' ? '' : newCategory;
        search(searchTerm, categoryToSearch);
    };

    if (!user) {
        return isLogin ? (
            <LoginForm switchToRegister={() => setIsLogin(false)} />
        ) : (
            <RegisterForm switchToLogin={() => setIsLogin(true)} />
        );
    }

    return (
        <>
            <Navbar showBookmarks={showBookmarks} setShowBookmarks={setShowBookmarks} />
            <MainLayout>
                {!showBookmarks ? (
                    <>
                        <div className="mb-8 space-y-4">
                            <SearchBar
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                onSearch={handleSearch}
                                loading={loading}
                            />
                            <CategoryFilter
                                category={category}
                                setCategory={handleCategoryChange}
                            />
                            {error && <p className="text-red-500">{error}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-3 text-center py-8">Loading...</div>
                            ) : results.length === 0 ? (
                                <div className="col-span-3 text-center py-8">No results found</div>
                            ) : (
                                results.map(result => (
                                    <ResultCard
                                        key={result.id}
                                        result={result}
                                        isBookmarked={bookmarks.some(b => b.id === result.id)}
                                        onBookmark={toggleBookmark}
                                    />
                                ))
                            )}
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookmarks.length === 0 ? (
                            <div className="col-span-3 text-center py-8">No bookmarks yet</div>
                        ) : (
                            bookmarks.map(bookmark => (
                                <ResultCard
                                    key={bookmark.id}
                                    result={bookmark}
                                    isBookmarked={true}
                                    onBookmark={toggleBookmark}
                                />
                            ))
                        )}
                    </div>
                )}
            </MainLayout>
        </>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
