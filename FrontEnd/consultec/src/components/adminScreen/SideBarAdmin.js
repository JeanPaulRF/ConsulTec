import React from 'react'

function SideBarAdmin({ selectedOption, onOptionChange }) {
    const handleOptionClick = (option) => {
        onOptionChange(option);
    };

    return (
        <div className="rounded-xl ml-20 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/6">
            <ul className="flex flex-col p-4 ml-4 font-bold">
                <li
                    className={`my-2 hover:bg-gray-700 p-2 cursor-pointer ${selectedOption === 'curso' ? 'bg-gray-700' : ''
                        }`}
                    onClick={() => handleOptionClick('curso')}
                >
                    Cursos
                </li>
                <li
                    className={`my-2 hover:bg-gray-700 p-2 cursor-pointer ${selectedOption === 'tema' ? 'bg-gray-700' : ''
                        }`}
                    onClick={() => handleOptionClick('tema')}
                >
                    Temas
                </li>
                <li
                    className={`my-2 hover:bg-gray-700 p-2 cursor-pointer ${selectedOption === 'subtema' ? 'bg-gray-700' : ''
                        }`}
                    onClick={() => handleOptionClick('subtema')}
                >
                    Subtemas
                </li>
                <li
                    className={`my-2 hover:bg-gray-700 p-2 cursor-pointer ${selectedOption === 'resumen' ? 'bg-gray-700' : ''
                        }`}
                    onClick={() => handleOptionClick('resumen')}
                >
                    Resúmenes
                </li>
                <li
                    className={`my-2 hover:bg-gray-700 p-2 cursor-pointer ${selectedOption === 'ejemplo' ? 'bg-gray-700' : ''
                        }`}
                    onClick={() => handleOptionClick('ejemplo')}
                >
                    Ejemplos
                </li>
                <li
                    className={`my-2 hover:bg-gray-700 p-2 cursor-pointer ${selectedOption === 'usuario' ? 'bg-gray-700' : ''
                        }`}
                    onClick={() => handleOptionClick('usuario')}
                >
                    Usuarios
                </li>
            </ul>
        </div>
    )
}

export default SideBarAdmin