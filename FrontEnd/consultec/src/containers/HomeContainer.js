import React from 'react';
import HomeView from '../views/HomeView';
import { useNavigate } from 'react-router-dom';


function HomeContainer  ()  {
    const navigate = useNavigate();

    const handleMaterial = (selectedCourse) => {
      const course = selectedCourse;
      navigate(`/material?course=${course}`);
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
        />

      </div>
    );
};

export default HomeContainer;