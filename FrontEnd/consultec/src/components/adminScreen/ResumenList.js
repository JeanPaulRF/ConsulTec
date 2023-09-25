import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const ResumenList = ({ refreshList }) => {
  const db = getFirestore(app);
  const [resumens, setResumens] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "resumen"));
    const getResumens = async () => {
      const querySnapshot = await getDocs(q);
      const resumensarray = [];
      querySnapshot.forEach((doc) => {
        resumensarray.push({ ...doc.data(), id: doc.id });
      });
      if (resumensarray.length === 0) {
        resumensarray.push({ nombre: '<No hay resumenes>' });
      }
      setResumens(resumensarray);
    };
    getResumens();
  }, [db, refreshList]);

  return (
    <div>
      <ul>
        {resumens.map((resumen) => (
          <li className='my-2 p-2' key={resumen.id}>{resumen.nombre}</li>
          // Puedes mostrar otros campos del resumen según tus necesidades
        ))}
      </ul>
    </div>
  );
};

export default ResumenList;
