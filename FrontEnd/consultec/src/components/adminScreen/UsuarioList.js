import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const UsuarioList = ({ refreshList }) => {
  const db = getFirestore(app);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "usuario"));
    const getUsuarios = async () => {
      const querySnapshot = await getDocs(q);
      const usuariosarray = [];
      querySnapshot.forEach((doc) => {
        usuariosarray.push({ ...doc.data(), id: doc.id });
      });

      setUsuarios(usuariosarray);
    };
    getUsuarios();
  }, [db, refreshList]);

  const handleDeleteUsuario = async (usuarioId) => {
    // Agrega aquí la lógica para eliminar el usuario
    console.log(`Eliminar usuario con ID: ${usuarioId}`);
  };

  const handleEditUsuario = (usuarioId) => {
    // Agrega aquí la lógica para editar el usuario
    console.log(`Editar usuario con ID: ${usuarioId}`);
  };

  return (
    <div>
      {usuarios.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li className='my-2 p-2 flex justify-between items-center' key={usuario.id}>
              <div>{usuario.nombre}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEditUsuario(usuario.id)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                  Editar
                </button>
                <button onClick={() => handleDeleteUsuario(usuario.id)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
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

export default UsuarioList;
