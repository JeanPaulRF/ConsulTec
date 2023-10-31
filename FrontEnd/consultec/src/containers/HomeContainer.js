import React from 'react';
import HomeView from '../views/HomeView';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';

function HomeContainer  ()  {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      const q = query(collection(db, "curso"));
      const getTemas = async () => {
        const querySnapshot = await getDocs(q);
        const temasarray = [];
        querySnapshot.forEach((doc) => {
          temasarray.push({ ...doc.data(), id: doc.id });
        });
  
        setCourses(temasarray);
      };
      getTemas();
    }, [db, courses]);

    const handleMaterial = (selectedCourse, title) => {
      const course = selectedCourse;
      navigate(`/material?course=${course}&title=${title}`);
    }

    const handleChangePassword = () => {
      navigate('/password')
    }

    const handleLogout = () => {
      navigate('/login')
    }

    return (
      <div>
        <HomeView
        onClickMaterial={handleMaterial}
        handleChangePassword={handleChangePassword}
        handleLogout={handleLogout}
        courses={courses}
        />
      </div>
    );
};

export default HomeContainer;