import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const ConsultaList = ({ refreshList, refreshDynamicDisplayList }) => {
  const db = getFirestore(app);
  const [consultas, setConsultas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedConsulta, setEditedConsulta] = useState();

  useEffect(() => {
    const q = query(collection(db, "consulta"));
    const getConsultas = async () => {
      const querySnapshot = await getDocs(q);
      const consultasarray = [];
      querySnapshot.forEach((doc) => {
        consultasarray.push({ ...doc.data(), id: doc.id });
      });

      setConsultas(consultasarray);
    };
    getConsultas();
  }, [db, refreshList]);

  const handleDeleteConsulta = async (consultaId) => {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar la consulta
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta consulta?");

    if (confirmDelete) {
      try {
        const consultaDocRef = doc(db, "consulta", consultaId);
        await deleteDoc(consultaDocRef);
        // Actualiza la lista después de eliminar la consulta
        setConsultas(consultas.filter((consulta) => consulta.id !== consultaId));
        console.log("Consulta eliminada exitosamente.");
      } catch (error) {
        console.error("Error al eliminar la consulta:", error);
      }
    } else {
      console.log("Operación de eliminación cancelada.");
    }
  };


  // Función para manejar la edición de usuario
  const handleSubmitEdicion = async (e) => {
    e.preventDefault();

    if (editedConsulta.titulo === '') {
      alert("El título de la consulta no puede estar vacío");
      return;
    }

    if (editedConsulta.consulta === '') {
      alert("La consulta no puede quedar vacía");
      return;
    }

    try {
      // Realiza la actualización de los datos de la consulta en Firestore
      const consultaDocRef = doc(db, "consulta", editedConsulta.id);
      await updateDoc(consultaDocRef, {
        consulta: editedConsulta.consulta, // Actualiza el titulo u otros campos según sea necesario
        titulo: editedConsulta.titulo,
      });

      setEditMode(false); // Desactiva el modo de edición
      alert("Consulta editada exitosamente.");
    } catch (error) {
      console.error("Error al editar la consulta:", error);
    }
  };

  const handleEditConsulta = (consulta) => {
    setEditMode(true);
    setEditedConsulta(consulta);
  };

  // Función para cancelar la edición y volver al modo de visualización
  const cancelarEdicion = () => {
    setEditMode(false);
    setEditedConsulta(null);
  };

  return (

    //Formulario de edicion de consulta
    <div>
      {editMode ? (
        <div className="rounded-xl mx-10 my-10 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-100">
          <div className='flex flex-col p-6'>
            <h2>Editar Consulta</h2>
            {editedConsulta && (
              <form onSubmit={handleSubmitEdicion}>
                <div style={{ display: 'block' }}>
                  <label>Título: </label>
                  <input
                    type="text"
                    value={editedConsulta.titulo}
                    onChange={(e) => setEditedConsulta({ ...editedConsulta, titulo: e.target.value })}
                    required
                    className='text-black my-2'
                  />
                </div>
                <div style={{ display: 'block' }}>
                  <label>Consulta: </label>
                  <input
                    type="text"
                    value={editedConsulta.consulta}
                    onChange={(e) => setEditedConsulta({ ...editedConsulta, consulta: e.target.value })}
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
          {consultas.length === 0 ? (
            <p>No hay consultas disponibles.</p>
          ) : (
            <ul>
              {consultas.map((consulta) => (
                <li className='my-2 p-2 flex justify-between items-center' key={consulta.id}>
                  <div>{consulta.titulo}</div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditConsulta(consulta)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteConsulta(consulta.id)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
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

export default ConsultaList;
