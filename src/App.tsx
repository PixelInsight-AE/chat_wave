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
import Room from './pages/Room';
import Account from './pages/Account';
import { io } from 'socket.io-client';
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const USER = useSelector((state) => state.auth);
  const socket = io('http://localhost:3333', {
    autoConnect: false,
    query: {
      id: USER.id,
    },
  });

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
        <Route path="/settings" element={isAuthenticated ? <Account /> : <Login />} />
        <Route path="/new-room" element={isAuthenticated ? <CreateRoom /> : <Login />} />
        <Route path="/room/:id" element={isAuthenticated ? <Room /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
