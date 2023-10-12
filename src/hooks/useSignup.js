import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabase';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'username') setUsername(value);
  };

  const checkIfUserExists = async () => {
    const { data } = await supabase.from('profiles').select('username').eq('username', username);
    if (data.length > 0) {
      setError('Username already exists');
      return true;
    }
    return false;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userExists = await checkIfUserExists();
    if (userExists) return;
    if (password.length < 8) {
      return setError('Password must be at least 8 characters');
    }
    if (username.length < 3) {
      return setError('Username must be at least 3 characters');
    }
    if (!email || !password || !username) {
      return setError('Please fill in all fields');
    }
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { username: username } },
    });
    if (error) setError(error.message);
    setLoading(false);
    navigate('/thanks');
  };

  return {
    handleInput,
    handleSignup,
    email,
    password,
    username,
    loading,
    error,
  };
};
export default useSignup;
