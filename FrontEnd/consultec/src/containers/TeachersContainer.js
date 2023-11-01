import React, { useState, useContext, useEffect } from "react";
import TeachersView from "../views/TeachersView";
import { app } from '../firebaseConfig';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Tabla from "../components/Teachers/Tabla";



function TeachersContainer(){


      const [consultas, setConsultas] = useState([]);
      
  
      const db = getFirestore(app);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const q = query(collection(db, "consulta"));
            const querySnapshot = await getDocs(q);
            const consultasArray = [];
          
    
            querySnapshot.forEach((doc) => {
              consultasArray.push({ ...doc.data(), id: doc.id });
            });
    
            setConsultas(consultasArray);
           
           
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };
    
        fetchData();
      }, [db]);

     

/* 
      useEffect(() => {
        // Función para extraer y almacenar los datos
        function extraerDatos() {
          const datosExtraidos = consultas.map((consulta1) => {
            const { titleSubject, consulta, isResolved, resolve } = consulta1;
            return { titleSubject, consulta, isResolved, resolve };
          });
    
          setDatosExtraidos(datosExtraidos);
        }
    
        // Llamar a la función para extraer y almacenar los datos solo una vez, cuando el componente se monta
        extraerDatos();
      }, [consultas]); // Asegúrate de incluir "consultas" en la lista de dependencias
      
      
 */
      const handleEstadoChange = (index, nuevoEstado) => {
        const nuevosDatos = [...consultas];
        nuevosDatos[index].isResolved = nuevoEstado;
        setConsultas(nuevosDatos);
      
   
        
      };
      console.log("Containers teacher");
      console.log(consultas);

    return(

         <TeachersView
        datos={consultas}
        onEstadoChange={handleEstadoChange} />
    )



}

export default TeachersContainer;
