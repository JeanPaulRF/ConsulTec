import React, { useState } from 'react'
import 'firebase/database';

import CursoForm from './CursoForm';
import TemaForm from './TemaForm';
import SubtemaForm from './SubtemaForm';
import ResumenForm from './ResumenForm';
import EjemploForm from './EjemploForm';
import UsuarioForm from './UsuarioForm';

function ButtonAdd({ selectedOption }) {
    const [showButton, setShowButton] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
        setShowButton(false);
        setShowForm(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar lógica para guardar los datos en Firebase
        // Después de agregar, puedes restablecer el estado para mostrar el botón nuevamente
        setShowButton(true);
        setShowForm(false);
    };
    return (
        <div>
            {showButton && (
                <button
                    onClick={handleButtonClick}
                    className="my-20 px-8 py-2 uppercase font-bold bg-blue-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-blue-400 hover:shadow-md focus:outline-none"
                >
                    Agregar {selectedOption}
                </button>
            )}

            {showForm && (
                <form onSubmit={handleFormSubmit}>
                    {selectedOption === 'curso' ? <CursoForm /> : null}
                    {selectedOption === 'tema' ? <TemaForm /> : null}
                    {selectedOption === 'subtema' ? <SubtemaForm /> : null}
                    {selectedOption === 'resumen' ? <ResumenForm /> : null}
                    {selectedOption === 'ejemplo' ? <EjemploForm /> : null}
                    {selectedOption === 'usuario' ? <UsuarioForm /> : null}
                    <button type="submit" className="bg-green-400">Guardar</button>
                </form>
            )}
        </div>
    )
}

export default ButtonAdd