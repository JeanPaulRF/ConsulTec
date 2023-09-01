import React from 'react';
import { Button } from '@nextui-org/react';

import '../styles/LoginStyle.css';

function LoginView({ email, password, onEmailChange, onPasswordChange, onLogin }) {
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => onPasswordChange(e.target.value)}
                    />
                    <button onClick={onLogin}>Login</button>
                    <href className="forgot-password">Olvido su contraseña?</href>
                    <href className="register">No tiene una cuenta? Registrese</href>
                </form>
            </div>
        </div>
    );
}

export default LoginView;
