import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getAuth, deleteUser } from 'firebase/auth';
import { collection, query, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

const UserList = ({ refreshList, refreshDynamicDisplayList }) => {

  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState();




  useEffect(() => {
    const fetchData = async () => {

      try {
        const q = query(collection(db, "users"));

        const querySnapshot = await getDocs(q);
        let userlist = []
        querySnapshot.forEach((doc) => {
          userlist.push({ id: doc.id, ...doc.data() })
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

  const formatoValido = /^[a-zA-Z0-9._%+-]+@(estudiantec\.cr|itcr\.ac\.cr)$/;

  

  // Función para manejar la edición de usuario
  const handleSubmitEdicion = async (e) => {
    e.preventDefault();

    const correoValido = formatoValido.test(editedUser.email);

    if (editedUser.email === '') {
      alert('No puede haber campos vacíos');
      return;
    }

    if (!correoValido) {
      alert("Por favor utiliza un correo @estudiantec.cr para estudiantes o @itcr.ac.cr para profesores");
      return;
    }

    try {
      // Realiza la actualización de los datos del usuario en Firestore
      const userDocRef = doc(db, "users", editedUser.id);
      await updateDoc(userDocRef, {
        email: editedUser.email, // Actualiza el correo electrónico u otros campos según sea necesario
        password: editedUser.password,
      });

      setEditMode(false); // Desactiva el modo de edición
      alert("Usuario editado exitosamente.");
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

  const handleEditUsuario = (usuario) => {
    setEditMode(true);
    setEditedUser(usuario);
  };

  // Función para cancelar la edición y volver al modo de visualización
  const cancelarEdicion = () => {
    setEditMode(false);
    setEditedUser(null);
  };

  return (
      
      //Formulario de edicion de usuario
      <div>
        {editMode ? (
          <div  className="rounded-xl mx-10 my-10 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-100">
            <div className='flex flex-col p-6'>
              <h2>Editar Usuario</h2>
              {editedUser && (
                <form onSubmit={handleSubmitEdicion}>
                  <div style={{ display: 'block' }}>
                    <label>Correo: </label>
                    <input
                      type="text"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      required
                      className='text-black my-2'
                    />
                  </div>
                  <div style={{ display: 'block' }}>
                    <label>Contraseña: </label>
                    <input
                      type="text"
                      value={editedUser.password}
                      onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
                      required
                      className='text-black my-2'
                    />
                  </div>

                  <button type="submit" className="text-sm my-2 px-4 py-2 uppercase font-bold bg-green-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-green-400 hover:shadow-md focus:outline-none">
                    Guardar Cambios
                  </button>
                  <button onClick={() => cancelarEdicion()} className="text-sm my-2 px-4 py-2 uppercase font-bold bg-red-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-red-400 hover:shadow-md focus:outline-none">
                    Cancelar
                  </button>
                </form>
              )}
            </div>
        </div>
        
        ) : (

          //Lista de usuarios registrados
          <div>
            {users.length === 0 ? (
              <p>No hay usuarios disponibles.</p>
            ) : (
              <ul>
                {users.map((user) => (
                  <li className='my-2 p-2 flex justify-between items-center' key={user.uid}>
                    <div>{user.email}</div>
                    <div className="p-2 flex gap-2">
                      <button onClick={() => handleEditUsuario(user)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
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
        )}
      </div>












  );
};


export default UserList;
