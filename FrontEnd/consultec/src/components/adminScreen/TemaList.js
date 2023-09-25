import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const TemaList = ({ refreshList}) => {
  const db = getFirestore(app);
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tema"));
    const getTemas = async () => {
      const querySnapshot = await getDocs(q);
      const temasarray = [];
      querySnapshot.forEach((doc) => {
        temasarray.push({ ...doc.data(), id: doc.id });
      });
      if (temasarray.length === 0) {
        temasarray.push({ nombre: '<No hay temas>' });
      }
      setTemas(temasarray);
    };
    getTemas();
  }, [db, refreshList]);

  return (
    <div>
      <ul>
        {temas.map((tema) => (
          <li className='my-2 p-2' key={tema.id}>{tema.nombre}</li>
          // Puedes mostrar otros campos del tema según tus necesidades
        ))}
      </ul>
    </div>
  );
};

export default TemaList;
