import React from 'react';

function LoginView({ username, password, onUsernameChange, onPasswordChange, onLogin }) {
    return (
        <div>
            <h2>Login</h2>
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
        </div>
    );
}

export default LoginView;
