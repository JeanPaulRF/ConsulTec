import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const CursoList = ({ refreshList }) => {
  const db = getFirestore(app);
  const [cursos, setCursos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedCurso, setEditedCurso] = useState();

  useEffect(() => {
    const q = query(collection(db, "curso"));
    const getCursos = async () => {
      const querySnapshot = await getDocs(q);
      const cursosarray = [];
      querySnapshot.forEach((doc) => {
        cursosarray.push({ ...doc.data(), id: doc.id });
      });

      setCursos(cursosarray);
    };
    getCursos();
  }, [db, refreshList]);

  const handleDeleteCurso = async (cursoId) => {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar el curso
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este curso?");

    if (confirmDelete) {
      try {
        const cursoDocRef = doc(db, "curso", cursoId);
        await deleteDoc(cursoDocRef);
        // Actualiza la lista después de eliminar el curso
        setCursos(cursos.filter((curso) => curso.id !== cursoId));
        console.log("Curso eliminado exitosamente.");
      } catch (error) {
        console.error("Error al eliminar el curso:", error);
      }
    } else {
      console.log("Operación de eliminación cancelada.");
    }
  };

  // Función para manejar la edición de curso
  const handleSubmitEdicion = async (e) => {
    e.preventDefault();

    if (editedCurso.nombre === '') {
      alert("El nombre del curso no puede estar vacío");
      return;
    }

    try {
      // Realiza la actualización de los datos del curso en Firestore
      const cursoDocRef = doc(db, "curso", editedCurso.id);
      await updateDoc(cursoDocRef, {
        nombre: editedCurso.nombre, // Actualiza el nombre u otros campos según sea necesario
      });

      setEditMode(false); // Desactiva el modo de edición
      alert("Curso editado exitosamente.");
    } catch (error) {
      console.error("Error al editar el curso:", error);
    }
  };

  const handleEditCurso = (curso) => {
    setEditMode(true);
    setEditedCurso(curso);
  };

  // Función para cancelar la edición y volver al modo de visualización
  const cancelarEdicion = () => {
    setEditMode(false);
    setEditedCurso(null);
  };

  return (
    //Formulario de edicion de curso
    <div>
      {editMode ? (
        <div className="rounded-xl mx-10 my-10 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-100">
          <div className='flex flex-col p-6'>
            <h2>Editar Curso</h2>
            {editedCurso && (
              <form onSubmit={handleSubmitEdicion}>
                <div style={{ display: 'block' }}>
                  <label>Nombre: </label>
                  <input
                    type="text"
                    value={editedCurso.nombre}
                    onChange={(e) => setEditedCurso({ ...editedCurso, nombre: e.target.value })}
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
          {cursos.length === 0 ? (
            <p>No hay cursos disponibles.</p>
          ) : (
            <ul>
              {cursos.map((curso) => (
                <li className='my-2 p-2 flex justify-between items-center' key={curso.id}>
                  <div>{curso.nombre}</div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditCurso(curso)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteCurso(curso.id)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
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

export default CursoList;
