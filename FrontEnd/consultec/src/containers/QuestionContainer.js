import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, where, doc} from "firebase/firestore";
import QuestionView from '../views/QuestionView';
import { db } from '../firebaseConfig';

function QuestionContainer  ()  {
    const navigate = useNavigate();
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const subTheme = searchParams.get('subtheme');
    const title = searchParams.get('title');
    const course = searchParams.get('course');

    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
      const subtemaRef = doc(db, 'subtema', subTheme);
      console.log(subtemaRef);
      const q = query(
        collection(db, "consulta"), 
        where('subtemaRef', "==", subtemaRef));
      const getTemas = async () => {
        const querySnapshot = await getDocs(q);
        var questionsArray = [];
        querySnapshot.forEach((doc) => {
          questionsArray.push({ ...doc.data(), id: doc.id });
        });
        console.log(questionsArray);
        setQuestions(questionsArray);
      };
      getTemas();
    }, [ subTheme]);

    const handleChangePassword = () => {
      navigate('/password')
    }

    const handleLogout = () => {
      navigate('/login')
    }

    return (
      <div>
        <QuestionView
        questions={questions}
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