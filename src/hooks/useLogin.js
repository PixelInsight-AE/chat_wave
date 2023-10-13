import supabase from '../config/supabase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const login = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    const username = await supabase.from('profiles').select('username').eq('id', data.user.id);
    console.log(data.user.user_metadata.avatar_url);
    if (error) return setError(error.message);
    dispatch(
      authActions.login({
        id: data.user.id,
        username: username.data[0].username,
        avatar_url: data.user.user_metadata.avatar_url,
      }),
    );
    if (data.user.user_metadata.avatar_url) {
      navigate('/menu');
    }
    navigate('/settings');
  };

  const checkAuth = async () => {
    const session = await supabase.auth.getSession();
    if (!session.data) return;
    const { data } = await supabase.auth.getUser();
    dispatch(
      authActions.login({
        id: session.data.session.user.id,
        username: data.user.user_metadata.username,
        avatar_url: data.user.user_metadata.avatar_url,
      }),
    );
    navigate('/menu');
  };
  const logout = async () => {
    await supabase.auth.signOut();
    dispatch(authActions.logout());
    navigate('/login');
  };
  return {
    login,
    logout,
    checkAuth,
    handleInput,
    email,
    password,
    loading,
    error,
  };
};

export default useLogin;

//error handling works
