import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, doc } from 'firebase/firestore';

function QuestionForm({ subTheme, course, user, courseTitle }) {
  const [titulo, setTitulo] = useState('');
  const [consulta, setConsulta] = useState('');
  const [selectedSubtema, setSelectedSubtema] = useState(subTheme);

  const handleNombreChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setConsulta(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titulo === '' || consulta === '' || selectedSubtema === '') {
      alert('No puede haber campos vacíos');
      return;
    }

    try {
      // Obtener la referencia del subtema seleccionado por su ID
      const subtemaRef = doc(db, 'subtema', selectedSubtema);
      console.log({
        titulo: titulo,
        consulta: consulta,
        subtemaRef: subtemaRef, 
        user: user,
        cursoRef: course,
        isResolved: false,
        titleSubject: courseTitle
      })
      // Guardar los datos en Firestore, incluida la URL del PDF
      await addDoc(collection(db, 'consulta'), {
        titulo: titulo,
        consulta: consulta,
        subtemaRef: subtemaRef, 
        user: user,
        cursoRef: course,
        isResolved: false,
        titleSubject: courseTitle,
        isLinked: false,
        isResolvePDF:false,
        linkRef:subtemaRef,
        resolve:""
      });
      // Limpia el formulario o realiza otras acciones según tus necesidades
      setTitulo('');
      setConsulta('');

      console.log('Consulta guardado con éxito.');
    } catch (error) {
      console.error('Error al guardar el consulta:', error);
    }
  };

  const onCancel = (e) => {
    // Limpia el formulario o realiza otras acciones según tus necesidades
    setTitulo('');
    setConsulta('');
  };

  return (
    <div className="rounded-xl mx-16 my-16 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font">
      <div className="flex flex-col p-6 items-center justify-center">
        <form>
          <div className='flex items-center justify-center my-2'>
            <input
              id='titulo'
              type="text"
              value={titulo}
              onChange={handleNombreChange}
              required
              className="text-black my-2"
              placeholder='Titulo'
            />
          </div>
          <div className='flex items-center justify-center my-2'>
            <textarea
              id='consuta'
              value={consulta}
              onChange={handleDescripcionChange}
              required
              className="text-black my-2"
              placeholder='Ingrese su consulta'
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="text-sm my-2 px-4 mr-1 py-2 uppercase font-bold bg-green-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-green-400 hover:shadow-md focus:outline-none"
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

export default QuestionForm;
