import { useState } from "react";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import RegisterView from "../views/RegisterView";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'


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

  const formatoValido = /^[a-zA-Z0-9._%+-]+@(estudiantec\.cr|itcr\.ac\.cr)$/;

  const correoValido = formatoValido.test(user.email);

  const handleSubmit = async e => {
    e.preventDefault()
    setError("");

    if (!correoValido) {
      alert("Por favor utiliza un correo @estudiantec.cr para estudiantes o @itcr.ac.cr para profesores");
    }
    else {
      try {
        const res = await signup(user.email, user.password)
        await setDoc(doc(db, "users", res.user.uid), {
          ...user,
        })
        alert("Cuenta creada");
        navigate('/login')
      } catch (error) {
        setError(error.message);

        if (error === 'auth/email-already-in-use') {
          alert("El usuario insertado ya existe. Ingrese uno distinto");
        }
        else{
          alert(error.message);
        }
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