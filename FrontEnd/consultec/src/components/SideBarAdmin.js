import React from 'react'

function SideBarAdmin() {
    return (
        <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/6">
            <ul className="flex flex-col p-4 ml-4">
                <li className="my-2 hover:bg-gray-700 p-2 cursor-pointer">
                    Cursos
                </li>
                <li className="my-2 hover:bg-gray-700 p-2 cursor-pointer">
                    Temas
                </li>
                <li className="my-2 hover:bg-gray-700 p-2 cursor-pointer">
                    Subtemas
                </li>
                <li className="my-2 hover:bg-gray-700 p-2 cursor-pointer">
                    Resúmenes
                </li>
                <li className="my-2 hover:bg-gray-700 p-2 cursor-pointer">
                    Ejemplos
                </li>
                <li className="my-2 hover:bg-gray-700 p-2 cursor-pointer">
                    Usuarios
                </li>
            </ul>
        </div>
    )
}

export default SideBarAdmin