import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Mail, Lock } from 'lucide-react';

export const LoginForm = ({ switchToRegister }) => {
    const { login } = useAuth();
    const { isDark } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if (data.token) {
                login(data.token);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#1a1f2e]' : 'bg-gray-50'} flex items-center justify-center p-4`}>
            <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${isDark ? 'bg-[#252d3d] border-gray-700' : 'bg-white border-gray-200'} border`}>
                <h1 className={`text-2xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Welcome Back
                </h1>
                <p className={`text-center mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Sign in to continue your journey
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                isDark
                                    ? 'bg-[#1a1f2e] border-gray-700 text-white placeholder-gray-500'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                isDark
                                    ? 'bg-[#1a1f2e] border-gray-700 text-white placeholder-gray-500'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            required
                        />
                    </div>
                    {error && (
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-red-500/10 border-red-500/50' : 'bg-red-100 border-red-300'} border`}>
                            <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            isDark
                                ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        } disabled:opacity-50`}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={switchToRegister}
                            className={`font-medium ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
                        >
                            Register
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};
