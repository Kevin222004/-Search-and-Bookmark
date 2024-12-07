import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return isLogin ? (
        <LoginForm switchToRegister={() => setIsLogin(false)} />
    ) : (
        <RegisterForm switchToLogin={() => setIsLogin(true)} />
    );
};
