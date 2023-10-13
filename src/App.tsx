import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Thanks from './pages/Thanks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import { useSelector } from 'react-redux';
import useLogin from './hooks/useLogin';
import Header from './components/shared/Header';
import CreateRoom from './pages/CreateRoom';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { checkAuth } = useLogin();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="*" element={<Login />} />
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        <Route path="/menu" element={isAuthenticated ? <Menu /> : <Login />} />
        <Route path="/settings" element={isAuthenticated ? <Menu /> : <Login />} />
        <Route path="/new-room" element={isAuthenticated ? <CreateRoom /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
