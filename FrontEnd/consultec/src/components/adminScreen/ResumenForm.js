import React, { useState } from 'react';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function ResumenForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [pdfFile, setPdfFile] = useState(null); // Nuevo estado para almacenar el archivo PDF

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handlePDFChange = (e) => {
    const selectedFile = e.target.files[0];
    setPdfFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === '' || descripcion === '' || pdfFile === null) {
      alert('No puede haber campos vacíos');
      return;
    }

    try {
      // Cargar el archivo PDF a Firebase Storage
      const uniqueFileName = `${Date.now()}_${pdfFile.name}`;
      const storageRef = ref(storage, `resumenes/${uniqueFileName}`);
      await uploadBytes(storageRef, pdfFile);

      // Obtener la URL de descarga del archivo PDF
      const pdfURL = await storageRef.getDownloadURL();

      // Guardar los datos en Firestore, incluida la URL del PDF
      await addDoc(collection(db, 'resumen'), {
        nombre: nombre,
        descripcion: descripcion,
        pdfURL: pdfURL,
      });

      // Llama a la función onSubmit para ejecutarla en ButtonAdd
      if (onSubmit) {
        onSubmit(e);
      }

      // Limpia el formulario o realiza otras acciones según tus necesidades
      setNombre('');
      setDescripcion('');
      setPdfFile(null); // Limpia el estado del archivo PDF

      console.log('Resumen guardado con éxito.');
    } catch (error) {
      console.error('Error al guardar el resumen:', error);
    }
  };

  const onCancel = (e) => {
    // Llama a la función onSubmit para ejecutarla en ButtonAdd
    if (onSubmit) {
      onSubmit(e);
    }
    // Limpia el formulario o realiza otras acciones según tus necesidades
    setNombre('');
    setDescripcion('');
    setPdfFile(null); // Limpia el estado del archivo PDF
  };

  return (
    <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/2">
      <div className="flex flex-col p-6">
        <form>
          <div style={{ display: 'block' }}>
            <label>
              Nombre del Resumen:
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
            <label>
              Descripción:
            </label>
            <textarea
              value={descripcion}
              onChange={handleDescripcionChange}
              required
              className="text-black my-2"
            />
          </div>
          <div style={{ display: 'block' }}>
            <label>
              Subir PDF:
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePDFChange}
              required
              className="text-black my-2"
            />
          </div>
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
            className="text-sm my-2 ml-3 px-4 py-2 uppercase font-bold bg-red-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-red-400 hover:shadow-md focus:outline-none"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>

  );
}

export default ResumenForm;
