import React from 'react'

export default function SubTemaList({ subtemas, onSelectSubTheme }) {
  return (
    <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font">
      {subtemas.length === 0 ? (
        <p>No hay subtemas disponibles.</p>
      ) : (
        <ul>
          {subtemas.map((subtema) => (
            <li onClick={() => onSelectSubTheme(subtema.id)}
              className='my-2 p-2 flex justify-between items-center cursor-pointer hover:bg-gray-500'
              key={subtema.id}
            >
              {subtema.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
