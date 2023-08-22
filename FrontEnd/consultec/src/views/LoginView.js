import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginStyle.css';

function LoginView({ username, password, onUsernameChange, onPasswordChange, onLogin }) {
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => onUsernameChange(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => onPasswordChange(e.target.value)}
                    />
                    <button onClick={onLogin}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginView;
