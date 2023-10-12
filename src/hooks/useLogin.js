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
    if (error) return setError(error.message);
    console.log(data);
    dispatch(
      authActions.login({
        id: data.user.id,
        username: data.user.username,
      }),
    );
    if (data.avatar_url) {
      //navigate('/menu');
    }
    //navigate('/profile');
  };
  useEffect(() => {
    console.log(password, email);
  }, [password, email]);

  return {
    login,
    handleInput,
    email,
    password,
    loading,
    error,
  };
};

export default useLogin;

//error handling works
