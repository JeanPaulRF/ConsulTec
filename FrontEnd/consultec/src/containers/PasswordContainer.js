import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { updatePassword } from "firebase/auth";
import PasswordView from "../views/PasswordView";
import { auth } from "../firebaseConfig";

function PasswordContainer() {

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const navigate = useNavigate()

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNewPasswordConfirmChange = (e) => {
    setNewPasswordConfirm(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault()

    if (newPassword!== "" 
    && newPassword.length > 5 
    && newPassword===newPasswordConfirm) {
      updatePassword(auth.currentUser, newPassword)
        .then(() => {
          alert("Contraseña actualizada");
          navigate('/home');
        })
        .catch((error) => {
          alert(`Error en el servidor, intentalo más tarde`);
          console.error(`Error: ${error}`)
        })
      
    }
    else {
      alert(`No conciden las contraseñas o están vacías`);
    }
    
  }

  const goHome = e => navigate('/home')

  return (
    <PasswordView
      newPassword={newPassword}
      newPasswordConfirm={newPasswordConfirm}
      handleNewPassword={handleNewPasswordChange}
      handleNewPasswordConfirmChange={handleNewPasswordConfirmChange}
      handleSubmit={handleSubmit}
      goHome={goHome}
    />
  );
}

export default PasswordContainer;