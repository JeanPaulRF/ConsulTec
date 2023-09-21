import React from 'react';
import CursoForm from './CursoForm';  
import TemaForm from './TemaForm';  
import SubtemaForm from './SubtemaForm';  
import ResumenForm from './ResumenForm';  
import EjemploForm from './EjemploForm';  
import UsuarioForm from './UsuarioForm';  

function DynamicForm({ selectedOption }) {
    return (
        <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/6">
            <div className='flex flex-col p-4 ml-4'>
                {selectedOption === 'curso' ? <CursoForm /> : null}
                {selectedOption === 'tema' ? <TemaForm /> : null}
                {selectedOption === 'subtema' ? <SubtemaForm /> : null}
                {selectedOption === 'resumen' ? <ResumenForm /> : null}
                {selectedOption === 'ejemplo' ? <EjemploForm /> : null}
                {selectedOption === 'usuario' ? <UsuarioForm /> : null}
            </div>
        </div>
    );
}

export default DynamicForm;
