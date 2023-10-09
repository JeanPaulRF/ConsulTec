import React, { useState } from 'react'
import { useAuth } from "../../context/authContext";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

function UsuarioForm({ onSubmit }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()

  const { signup } = useAuth()
  const [error, setError] = useState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const formatoValido = /^[a-zA-Z0-9._%+-]+@(estudiantec\.cr|itcr\.ac\.cr)$/;

  const correoValido = formatoValido.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (email === '') {
      alert('No puede haber campos vacíos');
      return;
    }

    if (!correoValido) {
      alert("Por favor utiliza un correo @estudiantec.cr para estudiantes o @itcr.ac.cr para profesores");
      return;
    }

    try {
      // Guarda los datos en Firebase

      const res = await signup(email, password)
      await setDoc(doc(db, "users", res.user.uid), {
        email: email,
        password: password,
      })

      alert("Usuario agregado");
    } catch (error) {
      setError(error.message);
      if (error.code === 'auth/email-already-in-use') {
        alert("El usuario ingresado ya existe. Ingrese uno distinto");
      }
      else {
        alert(error.message);
      }
    }
  };

  const onCancel = (e) => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/2">
      <div className='flex flex-col p-6'>
        <form>
          <div style={{ display: 'block' }}>
            <label>
              Correo electrónico:
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                required
                className='text-black my-2' />
            </label>
          </div>
          <div style={{ display: 'block' }}>
            <label>
              Contraseña:
              <input
                type="text"
                value={password}
                onChange={handlePasswordChange}
                required
                className='text-black my-2' />
            </label>
          </div>
          <button type="button" onClick={handleSubmit}
            className="text-sm my-2 px-4 py-2 uppercase font-bold bg-green-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-green-400 hover:shadow-md focus:outline-none"
          >
            Guardar
          </button>
          <button type="button" onClick={onCancel}
            className="text-sm my-2 px-4 py-2 uppercase font-bold bg-red-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-red-400 hover:shadow-md focus:outline-none"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div >
  );
}

export default UsuarioForm;