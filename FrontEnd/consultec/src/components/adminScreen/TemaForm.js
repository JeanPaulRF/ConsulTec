import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';

function TemaForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [selectedCurso, setSelectedCurso] = useState('');
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    // Obtener la lista de cursos disponibles desde Firebase
    const getCursos = async () => {
      const cursosSnapshot = await getDocs(collection(db, 'curso'));
      const cursosData = cursosSnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
      }));
      setCursos(cursosData);
    };

    getCursos();
  }, []);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCursoChange = (e) => {
    setSelectedCurso(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === '' || selectedCurso === '') {
      alert('No puede haber campos vacíos');
      return;
    }

    try {
      // Obtener la referencia del curso seleccionado por su ID
      const cursoRef = doc(db, 'curso', selectedCurso);

      // Guarda los datos en Firebase
      await addDoc(collection(db, 'tema'), {
        nombre: nombre,
        cursoRef: cursoRef, // Establece la referencia al curso
      });

      // Llama a la función onSubmit para ejecutarla en ButtonAdd
      if (onSubmit) {
        onSubmit(e);
      }

      // Limpia el formulario o realiza otras acciones según tus necesidades
      setNombre('');
      setSelectedCurso('');
    } catch (error) {
      console.error('Error al guardar el tema:', error);
    }
  };

  const onCancel = (e) => {
    // Llama a la función onSubmit para ejecutarla en ButtonAdd
    if (onSubmit) {
      onSubmit(e);
    }
    // Limpia el formulario o realiza otras acciones según tus necesidades
    setNombre('');
    setSelectedCurso('');
  };

  return (
    <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/3">
      <div className="flex flex-col p-6">
        <form>
          <label>
            Nombre del Tema:
            <input
              type="text"
              value={nombre}
              onChange={handleNombreChange}
              required
              className="text-black my-2"
            />
          </label>
          <label>
            Curso:
            <select
              value={selectedCurso}
              onChange={handleCursoChange}
              required
              className="text-black my-2"
            >
              <option value="">Selecciona un curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.nombre}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className="text-sm my-2 px-4 py-2 uppercase font-bold bg-green-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-green-400 hover:shadow-md focus:outline-none"
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

export default TemaForm;
