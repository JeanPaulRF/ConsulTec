import React from 'react'

export default function TemaList({ temas, onSelectTheme }) {
  return (
    <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font">
      {temas.length === 0 ? (
        <p>No hay temas disponibles.</p>
      ) : (
        <ul>
          {temas.map((tema) => (
            <li onClick={() => onSelectTheme(tema.id)}
              className='my-2 p-2 flex justify-between items-center cursor-pointer hover:bg-gray-500'
              key={tema.id}>
              <div>
                {tema.nombre}
              </div>
            </li>
          ))}
        </ul>
      )}</div>
  )
}

