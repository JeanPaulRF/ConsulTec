import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

const TemaList = ({ refreshList }) => {
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

      setTemas(temasarray);
    };
    getTemas();
  }, [db, refreshList]);

  const handleDeleteTema = async (temaId) => {
    try {
      const temaDocRef = doc(db, "tema", temaId);
      await deleteDoc(temaDocRef);
      // Actualiza la lista después de eliminar el tema
      setTemas(temas.filter((tema) => tema.id !== temaId));
    } catch (error) {
      console.error("Error al eliminar el tema:", error);
    }
  };

  const handleEditTema = (temaId) => {
    // Agrega aquí la lógica para editar el tema
    console.log(`Editar tema con ID: ${temaId}`);
  };

return (
  <div>
    {temas.length === 0 ? (
      <p>No hay temas disponibles.</p>
    ) : (
      <ul>
        {temas.map((tema) => (
          <li className='my-2 p-2 flex justify-between items-center' key={tema.id}>
            <div>{tema.nombre}</div>
            <div className="flex gap-2">
              <button onClick={() => handleEditTema(tema.id)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
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
);

};

export default TemaList;
