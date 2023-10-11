import React, { useState, useEffect } from 'react';
import { app, storage } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from 'firebase/storage'; // Importa las funciones de almacenamiento

const ResumenList = ({ refreshList }) => {
  const db = getFirestore(app);
  const [resumens, setResumens] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedResumen, setEditedResumen] = useState();

  useEffect(() => {
    const q = query(collection(db, "resumen"));
    const getResumens = async () => {
      const querySnapshot = await getDocs(q);
      const resumensarray = [];
      querySnapshot.forEach((doc) => {
        resumensarray.push({ ...doc.data(), id: doc.id });
      });

      setResumens(resumensarray);
    };
    getResumens();
  }, [db, refreshList]);

  const handleDeleteResumen = async (resumenId, pdfURL) => {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar el resumen
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este resumen?");

    if (confirmDelete) {
      try {
        const resumenDocRef = doc(db, "resumen", resumenId);

        // Elimina el documento de Firestore
        await deleteDoc(resumenDocRef);

        // Obtén una referencia al archivo en Firebase Storage usando la URL almacenada en Firestore
        const storageRef = ref(storage, pdfURL);

        // Elimina el archivo en Firebase Storage
        await deleteObject(storageRef);

        // Actualiza la lista después de eliminar el resumen
        setResumens(resumens.filter((resumen) => resumen.id !== resumenId));
        console.log("Resumen y archivo eliminados exitosamente.");
      } catch (error) {
        console.error("Error al eliminar el resumen:", error);
      }
    } else {
      console.log("Operación de eliminación cancelada.");
    }
  };

  // Función para manejar la edición de resumen
  const handleSubmitEdicion = async (e) => {
    e.preventDefault();

    if (editedResumen.nombre === '') {
      alert("El nombre del resumen no puede estar vacío");
      return;
    }

    if (editedResumen.descripcion === '') {
      alert("La descripción del resumen no puede estar vacía");
      return;
    }

    try {
      // Realiza la actualización de los datos del resumen en Firestore
      const resumenDocRef = doc(db, "resumen", editedResumen.id);
      await updateDoc(resumenDocRef, {
        nombre: editedResumen.nombre, // Actualiza el nombre u otros campos según sea necesario
        descripcion: editedResumen.descripcion
      });

      setEditMode(false); // Desactiva el modo de edición
      alert("Resumen editado exitosamente.");
    } catch (error) {
      console.error("Error al editar el resumen:", error);
    }
  };

  const handleEditResumen = (resumen) => {
    setEditMode(true);
    setEditedResumen(resumen);
  };

  // Función para cancelar la edición y volver al modo de visualización
  const cancelarEdicion = () => {
    setEditMode(false);
    setEditedResumen(null);
  };


  return (
    //Formulario de edicion de resumen
    <div>
      {editMode ? (
        <div className="rounded-xl mx-10 my-10 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-100">
          <div className='flex flex-col p-6'>
            <h2>Editar Resumen</h2>
            {editedResumen && (
              <form onSubmit={handleSubmitEdicion}>
                <div style={{ display: 'block' }}>
                  <label>Nombre: </label>
                  <input
                    type="text"
                    value={editedResumen.nombre}
                    onChange={(e) => setEditedResumen({ ...editedResumen, nombre: e.target.value })}
                    required
                    className='text-black my-2'
                  />
                </div>

                <div style={{ display: 'block' }}>
                  <label>Descripción: </label>
                  <input
                    type="text"
                    value={editedResumen.descripcion}
                    onChange={(e) => setEditedResumen({ ...editedResumen, descripcion: e.target.value })}
                    required
                    className='text-black my-2'
                  />
                </div>

                <button type="submit" className="text-sm my-2 px-4 py-2 uppercase font-bold bg-green-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-green-400 hover:shadow-md focus:outline-none">
                  Guardar Cambios
                </button>
                <button onClick={() => cancelarEdicion()} className="text-sm my-2 px-4 py-2 uppercase font-bold bg-red-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-red-400 hover:shadow-md focus:outline-none">
                  Cancelar
                </button>
              </form>
            )}
          </div>
        </div>

      ) : (

        <div>
          {resumens.length === 0 ? (
            <p>No hay resumenes disponibles.</p>
          ) : (
            <ul>
              {resumens.map((resumen) => (
                <li className='my-2 p-2 flex justify-between items-center' key={resumen.id}>
                  <div>{resumen.nombre}</div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditResumen(resumen)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteResumen(resumen.id, resumen.pdfURL)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
export default ResumenList;
