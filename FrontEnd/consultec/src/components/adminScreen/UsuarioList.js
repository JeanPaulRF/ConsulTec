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
      if (usuariosarray.length === 0) {
        usuariosarray.push({ nombre: '<No hay usuarios>' });
      }
      setUsuarios(usuariosarray);
    };
    getUsuarios();
  }, [db, refreshList]);

  return (
    <div>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre}</li>
          // Puedes mostrar otros campos del usuario según tus necesidades
        ))}
      </ul>
    </div>
  );
};

export default UsuarioList;
