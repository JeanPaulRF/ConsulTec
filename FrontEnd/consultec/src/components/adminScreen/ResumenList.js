import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

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

      setResumens(resumensarray);
    };
    getResumens();
  }, [db, refreshList]);

  const handleDeleteResumen = async (resumenId) => {
    try {
      const resumenDocRef = doc(db, "resumen", resumenId);
      await deleteDoc(resumenDocRef);
      // Actualiza la lista después de eliminar el resumen
      setResumens(resumens.filter((resumen) => resumen.id !== resumenId));
    } catch (error) {
      console.error("Error al eliminar el resumen:", error);
    }
  };

  const handleEditResumen = (resumenId) => {
    // Agrega aquí la lógica para editar el resumen
    // Puedes abrir un modal o redirigir a una página de edición
    // y pasar el ID del resumen que deseas editar
    console.log(`Editar resumen con ID: ${resumenId}`);
  };

  return (
    <div>
      {resumens.length === 0 ? (
      <p>No hay resumenes disponibles.</p>
    ) : (
      <ul>
        {resumens.map((resumen) => (
          <li className='my-2 p-2 flex justify-between items-center' key={resumen.id}>
            <div>{resumen.nombre}</div>
            <div className="flex gap-2">
              <button onClick={() => handleEditResumen(resumen.id)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                Editar
              </button>
              <button onClick={() => handleDeleteResumen(resumen.id)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
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

export default ResumenList;
