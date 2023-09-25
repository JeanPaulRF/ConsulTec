import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

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
            if (subtemasarray.length === 0) {
                subtemasarray.push({ nombre: '<No hay subtemas>' });
            }
            setSubtemas(subtemasarray);
        };
        getSubtemas();
    }, [db, refreshList]);

    return (
        <div>
            <ul>
                {subtemas.map((subtema) => (
                    <li className='my-2 p-2' key={subtema.id}>{subtema.nombre}</li>
                    // Puedes mostrar otros campos del subtema según tus necesidades
                ))}
            </ul>
        </div>
    );
};

export default SubtemaList;
