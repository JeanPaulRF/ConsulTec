import React from 'react';
import HomeView from '../views/HomeView';
import { useNavigate } from 'react-router-dom';


function HomeContainer  ()  {
    const navigate = useNavigate();

    const handleMaterial = () => {
        navigate('/login');
    }

    return (
      <div>
        <HomeView
        onClickMaterial={handleMaterial}
        
        />

      </div>
    );
};

export default HomeContainer;