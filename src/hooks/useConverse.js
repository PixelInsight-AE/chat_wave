import { useState, useEffect } from 'react';
import supabase from '../config/supabase';
import { useSelector } from 'react-redux';
const useConverse = (id) => {
  const USER = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    const newMessage = await supabase.from('conversations').insert({
      sender_id: USER.id,
      message: message,
      room_id: id,
    });
    setMessage('');
  };

  return { message, handleInput, sendMessage };
};
export default useConverse;
