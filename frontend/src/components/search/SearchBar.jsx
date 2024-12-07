import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Search } from 'lucide-react';

export const SearchBar = ({ onSearch, searchTerm, setSearchTerm, loading }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button type="submit" disabled={loading}>
                <Search className="h-4 w-4 mr-2" />
                {loading ? 'Searching...' : 'Search'}
            </Button>
        </form>
    );
};
