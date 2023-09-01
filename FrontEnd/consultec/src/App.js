import React from 'react';
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';

function App() {

  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" component={HomeContainer} />
          <Route path="/login" element={<LoginContainer />} />
        </Routes >
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;