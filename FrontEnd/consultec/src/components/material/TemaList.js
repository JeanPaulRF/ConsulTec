import React from 'react'

export default function TemaList({ temas, onSelectTheme }) {
  return (
    <div>
      {temas.length === 0 ? (
        <p>No hay temas disponibles.</p>
      ) : (
        <ul>
          {temas.map((tema) => (
            <li
              className='my-2 p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100'
              key={tema.id}>
              <div onClick={() => onSelectTheme(tema.id)}>
                {tema.nombre}
              </div>
            </li>
          ))}
        </ul>
      )}</div>
  )
}

