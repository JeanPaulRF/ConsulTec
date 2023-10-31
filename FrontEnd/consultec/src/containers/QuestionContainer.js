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
    const title = searchParams.get('title');
    const course = searchParams.get('course');

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
        title={title}
        course={course}
        />
      </div>
    );
};

export default QuestionContainer;