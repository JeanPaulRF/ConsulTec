import React from 'react'

export default function SubTemaList({ subtemas, onSelectSubTheme }) {
  return (
    <div>
      {subtemas.length === 0 ? (
        <p>No hay subtemas disponibles.</p>
      ) : (
        <ul>
          {subtemas.map((subtema) => (
            <li
              className='my-2 p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100'
              key={subtema.id}
              onClick={() => onSelectSubTheme(subtema.id)}
            >
              {subtema.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
