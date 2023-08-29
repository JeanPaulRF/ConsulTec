import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" component={HomeContainer} />
        <Route path="/login" element={<LoginContainer />} />
      </Routes >
    </BrowserRouter>
  );
}

export default App;