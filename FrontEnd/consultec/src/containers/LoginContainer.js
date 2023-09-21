import React, { useState } from 'react';
import { signInWithEmailAndPassword,  sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

import LoginView from '../views/LoginView';

function LoginContainer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
                if(userCredential.user.email === "admin@admin.com"){
                    navigate("/admin");
                }
                else{
                    navigate("/home");
                }
                console.log(userCredential);
            })
            .catch((error) => {
                alert('Usuario o contraseña incorrectos');
                console.log(error);
            });
    };

    const handleRegister = () => {
        navigate('/register');
    }

    const handleForgetPassword = () => {
        if(email !== ""){
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Te hemos enviado un correo para que actualices tu contraseña");
                handlePasswordChange("");
            })
            .catch((error) => {
                alert('Error al enviar el correo, vuelve a introducir tu correo');
                console.error(`Error code ${error.code}: ${error.message}`);
                handleEmailChange("");
            });
        } else {
            alert("Ingresa un correo en usuario para que podamos ayudarte")
        }
        
    }

    return (
        <LoginView
            email={email}
            password={password}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onLogin={handleLogin}
            onRegister={handleRegister}
            forgetPassword={handleForgetPassword}
        />
    );
}

export default LoginContainer;
