import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const TemaList = ({ refreshList }) => {
  const db = getFirestore(app);
  const [temas, setTemas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTema, setEditedTema] = useState();

  useEffect(() => {
    const q = query(collection(db, "tema"));
    const getTemas = async () => {
      const querySnapshot = await getDocs(q);
      const temasarray = [];
      querySnapshot.forEach((doc) => {
        temasarray.push({ ...doc.data(), id: doc.id });
      });

      setTemas(temasarray);
    };
    getTemas();
  }, [db, refreshList]);

  const handleDeleteTema = async (temaId) => {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar el tema
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este tema?");

    if (confirmDelete) {
      try {
        const temaDocRef = doc(db, "tema", temaId);
        await deleteDoc(temaDocRef);
        // Actualiza la lista después de eliminar el tema
        setTemas(temas.filter((tema) => tema.id !== temaId));
        console.log("Tema eliminado exitosamente.");
      } catch (error) {
        console.error("Error al eliminar el tema:", error);
      }
    } else {
      console.log("Operación de eliminación cancelada.");
    }
  };

  // Función para manejar la edición de tema
  const handleSubmitEdicion = async (e) => {
    e.preventDefault();

    if (editedTema.nombre === '') {
      alert("El tema no puede estar vacío");
      return;
    }

    try {
      // Realiza la actualización de los datos del tema en Firestore
      const temaDocRef = doc(db, "tema", editedTema.id);
      await updateDoc(temaDocRef, {
        nombre: editedTema.nombre, // Actualiza el nombre u otros campos según sea necesario
      });

      setEditMode(false); // Desactiva el modo de edición
      alert("Tema editado exitosamente.");
    } catch (error) {
      console.error("Error al editar el tema:", error);
    }
  };

  const handleEditTema = (tema) => {
    setEditMode(true);
    setEditedTema(tema);
  };

  // Función para cancelar la edición y volver al modo de visualización
  const cancelarEdicion = () => {
    setEditMode(false);
    setEditedTema(null);
  };

  return (
    //Formulario de edicion de Tema
    <div>
      {editMode ? (
        <div className="rounded-xl mx-10 my-10 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-100">
          <div className='flex flex-col p-6'>
            <h2>Editar Tema</h2>
            {editedTema && (
              <form onSubmit={handleSubmitEdicion}>
                <div style={{ display: 'block' }}>
                  <label>Nombre: </label>
                  <input
                    type="text"
                    value={editedTema.nombre}
                    onChange={(e) => setEditedTema({ ...editedTema, nombre: e.target.value })}
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
          {temas.length === 0 ? (
            <p>No hay temas disponibles.</p>
          ) : (
            <ul>
              {temas.map((tema) => (
                <li className='my-2 p-2 flex justify-between items-center' key={tema.id}>
                  <div>{tema.nombre}</div>
                  <div className="p-2 flex gap-2">
                    <button onClick={() => handleEditTema(tema)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteTema(tema.id)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
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

export default TemaList;
