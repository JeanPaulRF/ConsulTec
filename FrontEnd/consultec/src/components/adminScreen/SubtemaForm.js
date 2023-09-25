import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';

function SubtemaForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [selectedTema, setSelectedTema] = useState('');
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    // Obtener la lista de temas disponibles desde Firebase
    const getTemas = async () => {
      const temasSnapshot = await getDocs(collection(db, 'tema'));
      const temasData = temasSnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
      }));
      setTemas(temasData);
    };

    getTemas();
  }, []);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleTemaChange = (e) => {
    setSelectedTema(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === '' || selectedTema === '') {
      alert('No puede haber campos vacíos');
      return;
    }

    try {
      // Obtener la referencia del tema seleccionado por su ID
      const temaRef = doc(db, 'tema', selectedTema);

      // Guarda los datos en Firebase
      await addDoc(collection(db, 'subtema'), {
        nombre: nombre,
        temaRef: temaRef, // Establece la referencia al tema
      });

      // Llama a la función onSubmit para ejecutarla en ButtonAdd
      if (onSubmit) {
        onSubmit(e);
      }

      // Limpia el formulario o realiza otras acciones según tus necesidades
      setNombre('');
      setSelectedTema('');
    } catch (error) {
      console.error('Error al guardar el subtema:', error);
    }
  };

  const onCancel = (e) => {
    // Llama a la función onSubmit para ejecutarla en ButtonAdd
    if (onSubmit) {
      onSubmit(e);
    }
    // Limpia el formulario o realiza otras acciones según tus necesidades
    setNombre('');
    setSelectedTema('');
  };

  return (
    <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/2">
      <div className="flex flex-col p-6">
        <form>
          <div style={{ display: 'block' }}>
            <label>
              Nombre del Subtema:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={handleNombreChange}
              required
              className="text-black my-2"
            />

          </div>
          <div style={{ display: 'block' }}>
            <label className='mr-3'>
              Tema:
            </label>
            <select
              value={selectedTema}
              onChange={handleTemaChange}
              required
              className="text-black my-2"
            >
              <option value="">Selecciona un tema</option>
              {temas.map((tema) => (
                <option key={tema.id} value={tema.id}>
                  {tema.nombre}
                </option>
              ))}
            </select>

          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="text-sm my-2 mr-2 px-4 py-2 uppercase font-bold bg-green-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-green-400 hover:shadow-md focus:outline-none"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-sm my-2 px-4 py-2 uppercase font-bold bg-red-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-red-400 hover:shadow-md focus:outline-none"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubtemaForm;
