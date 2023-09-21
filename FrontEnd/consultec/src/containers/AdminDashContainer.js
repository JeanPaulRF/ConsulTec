import React from 'react'
import AdminDashView from '../views/AdminDashView'
import { useNavigate } from 'react-router-dom';

function AdminDashContainer() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <AdminDashView
      handleLogout={handleLogout}
    />
  )
}

export default AdminDashContainer