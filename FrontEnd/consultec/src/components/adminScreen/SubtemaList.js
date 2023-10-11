import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const SubtemaList = ({ refreshList }) => {
    const db = getFirestore(app);
    const [subtemas, setSubtemas] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedSubtema, setEditedSubtema] = useState();

    useEffect(() => {
        const q = query(collection(db, "subtema"));
        const getSubtemas = async () => {
            const querySnapshot = await getDocs(q);
            const subtemasarray = [];
            querySnapshot.forEach((doc) => {
                subtemasarray.push({ ...doc.data(), id: doc.id });
            });

            setSubtemas(subtemasarray);
        };
        getSubtemas();
    }, [db, refreshList]);

    const handleDeleteSubtema = async (subtemaId) => {
        // Mostrar un cuadro de diálogo de confirmación antes de eliminar el subtema
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este subtema?");

        if (confirmDelete) {
            try {
                const subtemaDocRef = doc(db, "subtema", subtemaId);
                await deleteDoc(subtemaDocRef);
                // Actualiza la lista después de eliminar el subtema
                setSubtemas(subtemas.filter((subtema) => subtema.id !== subtemaId));
                console.log("Subtema eliminado exitosamente.");
            } catch (error) {
                console.error("Error al eliminar el subtema:", error);
            }
        } else {
            console.log("Operación de eliminación cancelada.");
        }
    };

    // Función para manejar la edición de Subtema
    const handleSubmitEdicion = async (e) => {
        e.preventDefault();

        if (editedSubtema.nombre === '') {
            alert("El subtema no puede estar vacío");
            return;
        }

        try {
            // Realiza la actualización de los datos del subtema en Firestore
            const subtemaDocRef = doc(db, "subtema", editedSubtema.id);
            await updateDoc(subtemaDocRef, {
                nombre: editedSubtema.nombre, // Actualiza el nombre u otros campos según sea necesario
            });

            setEditMode(false); // Desactiva el modo de edición
            alert("Subtema editado exitosamente.");
        } catch (error) {
            console.error("Error al editar el subtema:", error);
        }
    };

    const handleEditSubtema = (subtema) => {
        setEditMode(true);
        setEditedSubtema(subtema);
    };

    // Función para cancelar la edición y volver al modo de visualización
    const cancelarEdicion = () => {
        setEditMode(false);
        setEditedSubtema(null);
    };

    return (
        //Formulario de edicion de subtema
        <div>
            {editMode ? (
                <div className="rounded-xl mx-10 my-10 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font w-100">
                    <div className='flex flex-col p-6'>
                        <h2>Editar Subtema</h2>
                        {editedSubtema && (
                            <form onSubmit={handleSubmitEdicion}>
                                <div style={{ display: 'block' }}>
                                    <label>Nombre: </label>
                                    <input
                                        type="text"
                                        value={editedSubtema.nombre}
                                        onChange={(e) => setEditedSubtema({ ...editedSubtema, nombre: e.target.value })}
                                        required
                                        className='text-black my-2'
                                    />
                                </div>

                                <button type="submit" className="text-sm my-2 px-4 py-2 uppercase font-bold bg-green-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-green-400 hover:shadow-md focus:outline-none">
                                    Guardar Cambios
                                </button>
                                <button onClick={() => cancelarEdicion()} className="text-sm my-2 px-4 py-2 uppercase font-bold bg-red-400 bg-opacity-80 text-white transition-all duration-150 rounded-3xl shadow outline-none active:bg-red-400 hover:shadow-md focus:outline-none">
                                    Cancelar
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            ) : (

                <div>
                    {subtemas.length === 0 ? (
                        <p>No hay subtemas disponibles.</p>
                    ) : (
                        <ul>
                            {subtemas.map((subtema) => (
                                <li className='my-2 p-2 flex justify-between items-center' key={subtema.id}>
                                    <div>{subtema.nombre}</div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEditSubtema(subtema)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDeleteSubtema(subtema.id)} className="bg-red-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-red-700 hover:bg-opacity-70">
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubtemaList;
