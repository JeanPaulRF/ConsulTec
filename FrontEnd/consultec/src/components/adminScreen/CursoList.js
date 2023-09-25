import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

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
      if (cursosarray.length === 0) {
        cursosarray.push({ nombre: '<No hay cursos>' });
      }
      setCursos(cursosarray);
    };
    getCursos();
  }, [db, refreshList]);

  return (
    <div>
      <ul>
        {cursos.map((curso) => (
          <li
            className='my-2 p-2'
            key={curso.id}>{curso.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default CursoList;
