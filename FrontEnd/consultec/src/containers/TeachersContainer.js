import React, { useState, useContext } from "react";
import TeachersView from "../views/TeachersView";



function TeachersContainer(){

   

    const [datos, setDatos] = useState([
        { Curso: 'Álgebra Lineal', Pregunta: '¿Cuál es la matriz identidad?', Estado: 'No resuelto', Calificación: '0' },
  { Curso: 'Cálculo Diferencial', Pregunta: '¿Cómo se calcula la derivada de una función?', Estado: 'Resuelto', Calificación: '10' },
  { Curso: 'Álgebra Lineal', Pregunta: 'Describa la ecuación de una línea en el plano', Estado: 'No resuelto', Calificación: '0' },
  { Curso: 'Estadística', Pregunta: '¿Qué es la desviación estándar?', Estado: 'Resuelto', Calificación: '8' },
  { Curso: 'Teoría de Números', Pregunta: '¿Cuáles son los números primos?', Estado: 'No resuelto', Calificación: '0' },
  { Curso: 'Cálculo Diferencial', Pregunta: 'Expliqueme el teorema fundamental del cálculo', Estado: 'No resuelto', Calificación: '0' },
  { Curso: 'Álgebra Lineal', Pregunta: '¿Qué es una curva en el espacio tridimensional?', Estado: 'Resuelto', Calificación: '9' },
  { Curso: 'Probabilidad', Pregunta: '¿Qué es un evento independiente?', Estado: 'Resuelto', Calificación: '7' },
  { Curso: 'Álgebra ', Pregunta: 'Describa un grupo algebraico', Estado: 'Resuelto', Calificación: '8' },
  { Curso: 'Ecuaciones Diferenciales', Pregunta: '¿Cómo se resuelven las ecuaciones diferenciales de primer orden?', Estado: 'No resuelto', Calificación: '0' },
  { Curso: 'Matemáticas General', Pregunta: '¿En qué campos se aplican las matemáticas?', Estado: 'Resuelto', Calificación: '10' }

       
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
