import React from 'react';
import CursoList from './CursoList';
import TemaList from './TemaList';
import SubtemaList from './SubtemaList';
import ResumenList from './ResumenList';
import EjemploList from './EjemploList';
import UsuarioList from './UsuarioList';

function DynamicDisplayList({ selectedOption, refreshList }) {
    
    return (
        <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/6">
            <div className='flex flex-col p-6 ml-4'>
                {selectedOption === 'curso' ? <CursoList refreshList={refreshList} /> : null}
                {selectedOption === 'tema' ? <TemaList refreshList={refreshList}/> : null}
                {selectedOption === 'subtema' ? <SubtemaList refreshList={refreshList}/> : null}
                {selectedOption === 'resumen' ? <ResumenList refreshList={refreshList}/> : null}
                {selectedOption === 'ejemplo' ? <EjemploList refreshList={refreshList}/> : null}
                {selectedOption === 'usuario' ? <UsuarioList refreshList={refreshList}/> : null}
            </div>
        </div>
    );
}

export default DynamicDisplayList;