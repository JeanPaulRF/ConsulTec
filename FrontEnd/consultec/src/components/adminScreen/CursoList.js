import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

const CursoList = ({ refreshList }) => {
  const db = getFirestore(app);
  const [cursos, setCursos] = useState([]);

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
    try {
      const cursoDocRef = doc(db, "curso", cursoId);
      await deleteDoc(cursoDocRef);
      // Actualiza la lista después de eliminar el curso
      setCursos(cursos.filter((curso) => curso.id !== cursoId));
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
    }
  };

  const handleEditCurso = (cursoId) => {
    // Agrega aquí la lógica para editar el curso
    console.log(`Editar curso con ID: ${cursoId}`);
  };

return (
  <div>
    {cursos.length === 0 ? (
      <p>No hay cursos disponibles.</p>
    ) : (
      <ul>
        {cursos.map((curso) => (
          <li className='my-2 p-2 flex justify-between items-center' key={curso.id}>
            <div>{curso.nombre}</div>
            <div className="flex gap-2">
              <button onClick={() => handleEditCurso(curso.id)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
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
);

};

export default CursoList;
