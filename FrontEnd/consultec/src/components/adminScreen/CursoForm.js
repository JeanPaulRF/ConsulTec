import React, { useState } from 'react';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function CursoForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSize = 1 * 1024 * 1024; // 1 MB en bytes

      if (file.size > maxSize) {
        alert('La imagen es demasiado grande. El tamaño máximo permitido es 1 MB.');
        e.target.value = null;
      } else {
        setImagen(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === '' || !imagen) {
      alert('No puede haber campos vacíos');
      return;
    }

    try {
      // Subir la imagen a Firebase Storage
      const uniqueImageName = `${Date.now()}_${imagen.name}`;
      const storageRef = ref(storage, `imagenes_cursos/${uniqueImageName}`);
      await uploadBytes(storageRef, imagen);

      // Obtener la URL de descarga de la imagen
      const imagenURL = await getDownloadURL(storageRef);

      // Guardar los datos en Firebase
      await addDoc(collection(db, 'curso'), {
        nombre: nombre,
        imagenURL: imagenURL,
      });

      if (onSubmit) {
        onSubmit(e);
      }

      setNombre('');
      setImagen(null);
    } catch (error) {
      console.error('Error al guardar el curso:', error);
    }
  };

  const onCancel = (e) => {
    if (onSubmit) {
      onSubmit(e);
    }

    setNombre('');
    setImagen(null);
  };

  return (
    <div className="rounded-xl mr-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-72">
      <div className='flex flex-col p-6'>
        <form>
          <div style={{ display: 'block' }}>
            <label>
              Nombre del Curso:
              <input
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                required
                className='text-black my-2'
              />
            </label>
          </div>
          <div style={{ display: 'block' }}>
            <label>
              Imagen del Curso (Máximo 1 MB):
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImagenChange}
                required
                className='text-white my-2'
              />
            </label>
          </div>
          <div style={{ display: 'block' }}>
            <button type="button" onClick={handleSubmit}
              className="text-sm my-2 px-4 py-2 uppercase font-bold bg-green-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-green-400 hover:shadow-md focus:outline-none"
            >
              Guardar
            </button>
          </div>
          <div style={{ display: 'block' }}>
            <button type="button" onClick={onCancel}
              className="text-sm my-2 px-4 py-2 uppercase font-bold bg-red-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-red-400 hover:shadow-md focus:outline-none"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div >
    </div >
  );
}

export default CursoForm;
