import React, { useState } from "react";
import TeachersView from "../views/TeachersView";


function TeachersContainer(){

    const [datos, setDatos] = useState([
        { Curso: 'CDI', Pregunta: 'Cuantas veces puedo derivar este ejercicio', Estado: 'No resuelto', Calificación: '0' },
        { Curso: 'Matematica General', Pregunta: 'Trigonometria entra en el ultimo parcial?', Estado: 'Resuelto', Calificación: '10' },
       
      ]);

      const handleEstadoChange = (index, nuevoEstado) => {
        const nuevosDatos = [...datos];
        nuevosDatos[index].Estado = nuevoEstado;
        setDatos(nuevosDatos);
      };

    return(

         <TeachersView 
        datos={datos}
        onEstadoChange={handleEstadoChange} />
    )



}

export default TeachersContainer;
