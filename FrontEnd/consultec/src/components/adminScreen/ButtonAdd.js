import React, { useState } from 'react'
import 'firebase/database';

import CursoForm from './CursoForm';
import TemaForm from './TemaForm';
import SubtemaForm from './SubtemaForm';
import ResumenForm from './ResumenForm';
import EjemploForm from './EjemploForm';
import UsuarioForm from './UsuarioForm';
import ConsultaForm from './ConsultaForm';

function ButtonAdd({ selectedOption, refreshDynamicDisplayList }) {
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
        refreshDynamicDisplayList();
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
                <form>
                    {selectedOption === 'curso' ? <CursoForm onSubmit={handleFormSubmit}/> : null}
                    {selectedOption === 'tema' ? <TemaForm onSubmit={handleFormSubmit}/> : null}
                    {selectedOption === 'subtema' ? <SubtemaForm onSubmit={handleFormSubmit}/> : null}
                    {selectedOption === 'consulta' ? <ConsultaForm onSubmit={handleFormSubmit}/> : null}
                    {selectedOption === 'resumen' ? <ResumenForm onSubmit={handleFormSubmit}/> : null}
                    {selectedOption === 'ejemplo' ? <EjemploForm onSubmit={handleFormSubmit}/> : null}
                    {selectedOption === 'usuario' ? <UsuarioForm onSubmit={handleFormSubmit}/> : null}
                </form>
            )}
        </div>
    )
}

export default ButtonAdd