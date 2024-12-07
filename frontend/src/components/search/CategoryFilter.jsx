export const CategoryFilter = ({ category, setCategory }) => {
    const categories = ['Articles', 'Reports', 'Profiles'];

    return (
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            <option value="">All Categories</option>
            {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
        </select>
    );
};
