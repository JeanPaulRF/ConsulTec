import React, { useState } from 'react';
import LoginView from '../views/LoginView';
import AuthService from '../services/AuthService'; // Archivo de servicio que maneja la autenticación

function LoginContainer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handleLogin = async () => {
        try {
            const response = await AuthService.login(email, password);
            if (response.success) {
                console.log("Login success:", response.user);
            } else {
                // Manejar errores de autenticación aquí
                console.log("Login failed:", response.user);
            }
        } catch (error) {
            console.log("Error handle login:", error);
        }
    };

    return (
        <LoginView
            email={email}
            password={password}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onLogin={handleLogin}
        />
    );
}

export default LoginContainer;
