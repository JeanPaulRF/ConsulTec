import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';
import RegisterContainer from './containers/RegisterContainer';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" component={HomeContainer} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/register" element={<RegisterContainer />} />
        </Routes >
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;