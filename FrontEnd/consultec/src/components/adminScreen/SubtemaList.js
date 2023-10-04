import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

const SubtemaList = ({ refreshList }) => {
    const db = getFirestore(app);
    const [subtemas, setSubtemas] = useState([]);

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


    const handleEditSubtema = (subtemaId) => {
        // Agrega aquí la lógica para editar el subtema
        // Puedes abrir un modal o redirigir a una página de edición
        // y pasar el ID del subtema que deseas editar
        console.log(`Editar subtema con ID: ${subtemaId}`);
    };

    return (
        <div>
            {subtemas.length === 0 ? (
                <p>No hay subtemas disponibles.</p>
            ) : (
                <ul>
                    {subtemas.map((subtema) => (
                        <li className='my-2 p-2 flex justify-between items-center' key={subtema.id}>
                            <div>{subtema.nombre}</div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditSubtema(subtema.id)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
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
    );
};

export default SubtemaList;
