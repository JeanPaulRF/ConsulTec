import { useState } from "react";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

import RegisterView from "../views/RegisterView";


function RegisterContainer() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const formatoValido = /^[a-zA-Z0-9._%+-]+@(estudiantec\.cr|itcr\.acr\.cr)$/;

  const correoValido = formatoValido.test(user.email);

  const handleSubmit = async e => {
    e.preventDefault()
    setError("");

    if (!correoValido) {
      alert("Por favor utiliza un correo @estudiantec.cr para estudiantes o @itcr.ac.cr para profesores");
    }
    else {
      try {
            await signup(user.email, user.password)
            navigate('/login')
          } catch (error) {
              setError(error.message);
              alert("Usuario o contraseña incorrectos")
          }
    }
    
  }

  const goLogin = e => navigate('/login')

  return (
    <RegisterView
      error={error}
      email={user.email}
      password={user.password}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      goLogin={goLogin}
    />
  );
}

export default RegisterContainer;