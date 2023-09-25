import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const EjemploList = ({ refreshList}) => {
  const db = getFirestore(app);
  const [ejemplos, setEjemplos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "ejemplo"));
    const getEjemplos = async () => {
      const querySnapshot = await getDocs(q);
      const ejemplosarray = [];
      querySnapshot.forEach((doc) => {
        ejemplosarray.push({ ...doc.data(), id: doc.id });
      });
      if (ejemplosarray.length === 0) {
        ejemplosarray.push({ nombre: '<No hay ejemplos>' });
      }
      setEjemplos(ejemplosarray);
    };
    getEjemplos();
  }, [db, refreshList]);

  return (
    <div>
      <ul>
        {ejemplos.map((ejemplo) => (
          <li className='my-2 p-2' key={ejemplo.id}>{ejemplo.nombre}</li>
          // Puedes mostrar otros campos del ejemplo según tus necesidades
        ))}
      </ul>
    </div>
  );
};

export default EjemploList;
