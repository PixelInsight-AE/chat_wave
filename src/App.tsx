import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
