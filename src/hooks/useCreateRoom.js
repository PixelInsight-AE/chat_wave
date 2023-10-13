import { useState, useEffect } from 'react';
import supabase from '../config/supabase';
const useCreateRoom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [toInvite, setToInvite] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'roomName') setRoomName(value);
    if (name === 'roomType') setRoomType(value);
    if (name === 'roomDescription') setRoomDescription(value);
  };
  const handleInvite = (e) => {
    const { value } = e.target;
    setToInvite(value.push());
  };
  const createRoom = async (e) => {
    const { data, error } = await supabase.rpc('create_room', {
      room_name: roomName,
      room_type: roomType,
      room_description: roomDescription,
      // to_invite: toInvite,
    });
    if (error) return setError(error.message);
    console.log(data);
  };

  return { error, loading, handleInput, handleInvite, createRoom, roomName, roomType, roomDescription, toInvite };
};
export default useCreateRoom;
