import React, { useState } from 'react'
import AdminDashView from '../views/AdminDashView'
import { useNavigate } from 'react-router-dom';

function AdminDashContainer() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('curso');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <AdminDashView
      handleLogout={handleLogout}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
    />
  )
}

export default AdminDashContainer