import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';

function ConsultaForm({ onSubmit }) {
    const [titulo, setTitulo] = useState('');
    const [consulta, setConsulta] = useState('');
    const [selectedSubtema, setSelectedSubtema] = useState('');
    const [subtemas, setSubtemas] = useState([]);

    useEffect(() => {
        // Obtener la lista de subtemas disponibles desde Firebase
        const getSubtemas = async () => {
            const subtemasSnapshot = await getDocs(collection(db, 'subtema'));
            const subtemasData = subtemasSnapshot.docs.map((doc) => ({
                id: doc.id,
                nombre: doc.data().nombre,
            }));
            setSubtemas(subtemasData);
        };

        getSubtemas();
    }, []);

    const handleNombreChange = (e) => {
        setTitulo(e.target.value);
    };

    const handleSubtemaChange = (e) => {
        setSelectedSubtema(e.target.value);
    };

    const handleDescripcionChange = (e) => {
        setConsulta(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (titulo === '' || consulta === '' || selectedSubtema === '') {
            alert('No puede haber campos vacíos');
            return;
        }

        try {
            // Obtener la referencia del subtema seleccionado por su ID
            const subtemaRef = doc(db, 'subtema', selectedSubtema);

            // Guardar los datos en Firestore, incluida la URL del PDF
            await addDoc(collection(db, 'consulta'), {
                titulo: titulo,
                consulta: consulta,
                subtemaRef: subtemaRef, // Establece la referencia al subtema
                estado: 'pendiente',
                fecha: new Date(),
            });

            // Llama a la función onSubmit para ejecutarla en ButtonAdd
            if (onSubmit) {
                onSubmit(e);
            }

            // Limpia el formulario o realiza otras acciones según tus necesidades
            setTitulo('');
            setConsulta('');

            console.log('Consulta guardado con éxito.');
        } catch (error) {
            console.error('Error al guardar el consulta:', error);
        }
    };

    const onCancel = (e) => {
        // Llama a la función onSubmit para ejecutarla en ButtonAdd
        if (onSubmit) {
            onSubmit(e);
        }
        // Limpia el formulario o realiza otras acciones según tus necesidades
        setTitulo('');
        setConsulta('');
    };

    return (
        <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-1/2">
            <div className="flex flex-col p-6">
                <form>
                    <div style={{ display: 'block' }}>
                        <label>
                            Titulo:
                        </label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={handleNombreChange}
                            required
                            className="text-black my-2"
                        />
                    </div>
                    <div style={{ display: 'block' }}>
                        <label>
                            Consulta:
                        </label>
                        <textarea
                            value={consulta}
                            onChange={handleDescripcionChange}
                            required
                            className="text-black my-2"
                        />
                    </div>
                    <div style={{ display: 'block' }}>
                        <label className='mr-3'>
                            Subtema:
                        </label>
                        <select
                            value={selectedSubtema}
                            onChange={handleSubtemaChange}
                            required
                            className="text-black my-2"
                        >
                            <option value="">Selecciona un subtema</option>
                            {subtemas.map((tema) => (
                                <option key={tema.id} value={tema.id}>
                                    {tema.nombre}
                                </option>
                            ))}
                        </select>

                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-sm my-2 px-4 mr-1 py-2 uppercase font-bold bg-green-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-green-400 hover:shadow-md focus:outline-none"
                    >
                        Guardar
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-sm my-2 px-4 py-2 uppercase font-bold bg-red-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-red-400 hover:shadow-md focus:outline-none"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>

    );
}

export default ConsultaForm;
