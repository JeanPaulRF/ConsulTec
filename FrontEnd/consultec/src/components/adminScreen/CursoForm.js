import React, { useState } from 'react'
import { db } from '../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

function CursoForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === '') {
      alert('No puede haber campos vacíos');
      return;
    }

    try {
      // Guarda los datos en Firebase
      await addDoc(collection(db, 'curso'), {
        nombre: nombre,
      });

      // Llama a la función onSubmit para ejecutarla en ButtonAdd
      if (onSubmit) {
        onSubmit(e);
      }

      // Limpia el formulario o realiza otras acciones según tus necesidades
      setNombre('');

    } catch (error) {
      console.error("Error al guardar el curso:", error);
    }
  };

  const onCancel = (e) => {
    // Llama a la función onSubmit para ejecutarla en ButtonAdd
    if (onSubmit) {
      onSubmit(e);
    }
    // Limpia el formulario o realiza otras acciones según tus necesidades
    setNombre('');
  };

  return (
    <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/3">
      <div className='flex flex-col p-6'>
        <form>
          <label>
            Nombre del Curso:
            <input
              type="text"
              value={nombre}
              onChange={handleNombreChange}
              required
              className='text-black my-2' />
          </label>
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
    </div>
  );
}

export default CursoForm;