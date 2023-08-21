import React, { useState } from 'react';
import LoginView from '../views/LoginView';
import AuthService from '../services/AuthService'; // Archivo de servicio que maneja la autenticación

function LoginContainer() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handleLogin = async () => {
        try {
            const response = await AuthService.login(username, password);
            // Manejar la respuesta de autenticación aquí

        } catch (error) {
            // Manejar errores de autenticación aquí
        }
    };

    return (
        <LoginView
            username={username}
            password={password}
            onUsernameChange={handleUsernameChange}
            onPasswordChange={handlePasswordChange}
            onLogin={handleLogin}
        />
    );
}

export default LoginContainer;
