import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

const EjemploList = ({ refreshList }) => {
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

      setEjemplos(ejemplosarray);
    };
    getEjemplos();
  }, [db, refreshList]);

  const handleDeleteEjemplo = async (ejemploId) => {
    try {
      const ejemploDocRef = doc(db, "ejemplo", ejemploId);
      await deleteDoc(ejemploDocRef);
      // Actualiza la lista después de eliminar el ejemplo
      setEjemplos(ejemplos.filter((ejemplo) => ejemplo.id !== ejemploId));
    } catch (error) {
      console.error("Error al eliminar el ejemplo:", error);
    }
  };

  const handleEditEjemplo = (ejemploId) => {
    // Agrega aquí la lógica para editar el ejemplo
    // Puedes abrir un modal o redirigir a una página de edición
    // y pasar el ID del ejemplo que deseas editar
    console.log(`Editar ejemplo con ID: ${ejemploId}`);
  };

  return (
    <div>
      {ejemplos.length === 0 ? (
        <p>No hay ejemplos disponibles.</p>
      ) : (
        <ul>
          {ejemplos.map((ejemplo) => (
            <li className='my-2 p-2 flex justify-between items-center' key={ejemplo.id}>
              <div>{ejemplo.nombre}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEditEjemplo(ejemplo.id)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                  Editar
                </button>
                <button onClick={() => handleDeleteEjemplo(ejemplo.id)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
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

export default EjemploList;
