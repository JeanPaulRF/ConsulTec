import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

const ConsultaList = ({ refreshList }) => {
  const db = getFirestore(app);
  const [consultas, setConsultas] = useState([]);

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


  const handleEditConsulta = (consultaId) => {
    // Agrega aquí la lógica para editar el consulta
    // Puedes abrir un modal o redirigir a una página de edición
    // y pasar el ID del consulta que deseas editar
    console.log(`Editar consulta con ID: ${consultaId}`);
  };

  return (
    <div>
      {consultas.length === 0 ? (
        <p>No hay consultas disponibles.</p>
      ) : (
        <ul>
          {consultas.map((consulta) => (
            <li className='my-2 p-2 flex justify-between items-center' key={consulta.id}>
              <div>{consulta.titulo}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEditConsulta(consulta.id)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
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
  );
};

export default ConsultaList;
