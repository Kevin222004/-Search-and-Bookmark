import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const MainLayout = ({ children }) => {
    const { isDark } = useTheme();

    return (
        <div className={isDark ? 'bg-[#1a1f2e] min-h-screen' : 'bg-gray-50 min-h-screen'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </div>
        </div>
    );
};
