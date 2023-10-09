import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getAuth, deleteUser } from 'firebase/auth';
import { collection, query, getDocs, doc, deleteDoc} from "firebase/firestore";
import { db } from '../../firebaseConfig';

const UserList = ( {refreshList}) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    let userlist = []  
      try {
        const q = query(collection(db, "users"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          userlist.push( {id: doc.id, ...doc.data()})
        });
        setUsers(userlist);
      }
      catch (error) {
        console.log(error)
      }
    };
    fetchData()
  }, [db, refreshList]);

  const handleDeleteUsuario = async (userId) => {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar el curso
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");

    if (confirmDelete) {
      try {

        const userDocRef = doc(db, "users", userId);
        await deleteDoc(userDocRef);
        // Actualiza la lista después de eliminar el curso
        setUsers(users.filter((user) => user.uid !== userId));
        alert("Usuario eliminado exitosamente.");
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    } else {
      console.log("Operación de eliminación cancelada.");
    }
  };
  
  const handleEditUsuario = (usuarioId) => {
    // Agrega aquí la lógica para editar el usuario
    console.log(`Editar usuario con ID: ${usuarioId}`);
  };

return (
  <div>
    {users.length === 0 ? (
      <p>No hay usuarios disponibles.</p>
    ) : (
      <ul>
        {users.map((user) => (
          <li className='my-2 p-2 flex justify-between items-center' key={user.uid}>
            <div>{user.email}</div>
            <div className="flex gap-2">
              <button onClick={() => handleEditUsuario(user.id)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                Editar
              </button>
              <button onClick={() => handleDeleteUsuario(user.id)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
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


export default UserList;
