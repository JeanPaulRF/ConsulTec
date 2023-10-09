import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('BackEnd/functions/leerUsuarios.js') // Cambia esto para que coincida con la URL de tu función en Firebase Functions
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
