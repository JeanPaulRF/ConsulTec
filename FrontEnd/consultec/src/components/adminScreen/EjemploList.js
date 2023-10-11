import React, { useState, useEffect } from 'react';
import { app, storage } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from 'firebase/storage'; // Importa las funciones de almacenamiento

const EjemploList = ({ refreshList }) => {
  const db = getFirestore(app);
  const [ejemplos, setEjemplos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedEjemplo, setEditedEjemplo] = useState();

  useEffect(() => {
    const q = query(collection(db, "ejemplo"));
    const getEjemplos = async () => {
      const querySnapshot = await getDocs(q);
      const ejemplosarray = [];
      querySnapshot.forEach((doc) => {
        ejemplosarray.push({ ...doc.data(), id: doc.id });
      });

      setEjemplos(ejemplosarray);
    };
    getEjemplos();
  }, [db, refreshList]);

  const handleDeleteEjemplo = async (ejemploId, pdfURL) => {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar el ejemplo
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este ejemplo?");

    if (confirmDelete) {
      try {
        const ejemploDocRef = doc(db, "ejemplo", ejemploId);

        // Elimina el documento de Firestore
        await deleteDoc(ejemploDocRef);

        // Obtén una referencia al archivo en Firebase Storage usando la URL almacenada en Firestore
        const storageRef = ref(storage, pdfURL);

        // Elimina el archivo en Firebase Storage
        await deleteObject(storageRef);

        // Actualiza la lista después de eliminar el ejemplo
        setEjemplos(ejemplos.filter((ejemplo) => ejemplo.id !== ejemploId));
        console.log("Ejemplo y archivo eliminados exitosamente.");
      } catch (error) {
        console.error("Error al eliminar el ejemplo:", error);
      }
    } else {
      console.log("Operación de eliminación cancelada.");
    }
  };

  // Función para manejar la edición de ejemplo
  const handleSubmitEdicion = async (e) => {
    e.preventDefault();

    if (editedEjemplo.nombre === '') {
      alert("El nombre del ejemplo no puede estar vacío");
      return;
    }

    if (editedEjemplo.descripcion === '') {
      alert("La descripción del ejemplo no puede estar vacía");
      return;
    }

    try {
      // Realiza la actualización de los datos del ejemplo en Firestore
      const ejemploDocRef = doc(db, "ejemplo", editedEjemplo.id);
      await updateDoc(ejemploDocRef, {
        nombre: editedEjemplo.nombre, // Actualiza el nombre u otros campos según sea necesario
        descripcion: editedEjemplo.descripcion
      });

      setEditMode(false); // Desactiva el modo de edición
      alert("Ejemplo editado exitosamente.");
    } catch (error) {
      console.error("Error al editar el ejemplo:", error);
    }
  };

  const handleEditEjemplo = (ejemplo) => {
    setEditMode(true);
    setEditedEjemplo(ejemplo);
  };

  // Función para cancelar la edición y volver al modo de visualización
  const cancelarEdicion = () => {
    setEditMode(false);
    setEditedEjemplo(null);
  };

  return (
    //Formulario de edicion de ejemplo
    <div>
      {editMode ? (
        <div className="rounded-xl mx-10 my-10 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-100">
          <div className='flex flex-col p-6'>
            <h2>Editar Ejemplo</h2>
            {editedEjemplo && (
              <form onSubmit={handleSubmitEdicion}>
                <div style={{ display: 'block' }}>
                  <label>Nombre: </label>
                  <input
                    type="text"
                    value={editedEjemplo.nombre}
                    onChange={(e) => setEditedEjemplo({ ...editedEjemplo, nombre: e.target.value })}
                    required
                    className='text-black my-2'
                  />
                </div>

                <div style={{ display: 'block' }}>
                  <label>Descripción: </label>
                  <input
                    type="text"
                    value={editedEjemplo.descripcion}
                    onChange={(e) => setEditedEjemplo({ ...editedEjemplo, descripcion: e.target.value })}
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
          {ejemplos.length === 0 ? (
            <p>No hay ejemplos disponibles.</p>
          ) : (
            <ul>
              {ejemplos.map((ejemplo) => (
                <li className='my-2 p-2 flex justify-between items-center' key={ejemplo.id}>
                  <div>{ejemplo.nombre}</div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditEjemplo(ejemplo)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteEjemplo(ejemplo.id, ejemplo.pdfURL)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
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
export default EjemploList;
