import { useRef, useState, useEffect } from 'react';
import supabase from '../config/supabase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const useCreateRoom = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roomCapacity, setRoomCapacity] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [toInvite, setToInvite] = useState([]);
  const [roomImg, setRoomImg] = useState(null);
  const [roomImgUrl, setRoomImgUrl] = useState(null);
  const { id } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRoomImg(file);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'roomName') setRoomName(value);
    if (name === 'roomType') setRoomType(value);
    if (name === 'roomDescription') setRoomDescription(value);
    if (name === 'roomCapacity') setRoomCapacity(value);
  };

  const handleAddInvite = (e) => {
    const { value } = e.target;
    setToInvite(value.push());
  };

  const uploadRoomPhoto = async () => {
    if (!roomImg) return setError('You must select a file to upload');
    const { data, error } = await supabase.storage.from('room_photo').upload(`room-${roomName}`, roomImg);
    if (error) return setError(error.message);
    const publicUrl = supabase.storage.from('room_photo').getPublicUrl(`room-${roomName}`);
    return publicUrl.data.publicUrl;
  };

  const createRoom = async () => {
    const publicUrl = await uploadRoomPhoto();
    const { data, error } = await supabase.rpc('fn_create_room', {
      owner_id: id,
      name: roomName,
      description: roomDescription,
      room_type: roomType,
      room_password: null,
      capacity: roomCapacity,
      picture: publicUrl,
    });
    if (error) return setError(error.message);
    // console.log(data);
    navigate('/');
    alert('Room Created');
  };

  useEffect(() => {
    const generateObjectUrl = () => {
      const objectUrl = URL.createObjectURL(roomImg);
      setRoomImgUrl(objectUrl);
    };
    if (roomImg) {
      generateObjectUrl();
    }
  }, [roomImg]);
  useEffect(() => {
    // console.log(roomImg);
  }, [roomImg]);
  return { error, loading, handleFileInput, handleInput, handleAddInvite, createRoom, roomName, roomType, roomDescription, toInvite, fileInputRef, handleImageClick, roomImg, roomImgUrl, roomCapacity };
};
export default useCreateRoom;
