import React, { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseApp from '../firebaseConfig';


import LoginView from '../views/LoginView';

function LoginContainer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(firebaseApp);

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                console.log(userCredential);
            })
            .catch((error) => {
                alert('Usuario o contraseña incorrectos');
                console.log(error);
            });
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
