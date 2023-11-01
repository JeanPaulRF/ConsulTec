import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getFirestore, collection, query, getDocs, where, doc} from "firebase/firestore";
import QuestionView from '../views/QuestionView';

function QuestionContainer  ()  {
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const subTheme = searchParams.get('subtheme');

    // const db = getFirestore(app);
    // const [questions, setQuestions] = useState([]);
    
    // useEffect(() => {
    //   const cursoRef = doc(db, 'consulta', subTheme);
    //   const q = query(
    //     collection(db, "consulta"), 
    //     where('cursoRef', "==", cursoRef));
    //   const getTemas = async () => {
    //     const querySnapshot = await getDocs(q);
    //     const questionsArray = [];
    //     querySnapshot.forEach((doc) => {
    //       questionsArray.push({ ...doc.data(), id: doc.id });
    //     });
  
    //     setQuestions(questionsArray);
    //   };
    //   getTemas();
    // }, [db, subTheme, questions]);
    const documentoID = "idgenerado";
    const datosParaActualizar = {
      consulta: "Nueva consulta",
      subtemaRef: "Nuevo subtemaRef",
      cursoRef: "Nuevo cursoRef",
      titleSubject: "Nuevo titleSubject",
      titulo: "Nuevo título",
      isResolved: true,
      isLinked: true,
      isResolvePDF: true,
      linkRef: "Nuevo linkRef",
      resolve: ["Valor1", "Valor2", "Valor3"], // Aquí agregamos un array de valores
    };
    
    // Obtén una referencia al documento que deseas actualizar
    const documentoRef = doc(db, 'tuColeccion', documentoID); // Reemplaza 'tuColeccion' con el nombre de tu colección
    const db = getFirestore(app);
    
/*     // Actualiza el documento con los nuevos datos, incluyendo el array
    updateDoc(documentoRef, datosParaActualizar)
      .then(() => {
        console.log("Documento actualizado con éxito");
      })
      .catch((error) => {
        console.error("Error al actualizar el documento:", error);
      });  */

    const handleChangePassword = () => {
      navigate('/password')
    }

    const handleLogout = () => {
      navigate('/login')
    }

    return (
      <div>
        <QuestionView
        // questions={questions}
        handleChangePassword={handleChangePassword}
        handleLogout={handleLogout}
        subTheme={subTheme}
        />
      </div>
    );
};

export default QuestionContainer;