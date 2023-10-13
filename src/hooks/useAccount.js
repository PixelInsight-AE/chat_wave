import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../config/supabase';
import { authActions } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
const useAccount = () => {
  const USER = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const accountRef = useRef(null);
  const [avatarImgUrl, setAvatarImgUrl] = useState(USER.avatar_url);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(USER.username);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  const handleImageClick = () => {
    if (accountRef.current) {
      accountRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const uploadNewAvatar = async () => {
    const { data, error } = await supabase.storage.from('avatars').upload(`avatar-${username}`, file);
    if (error) return setError(error.message);
    const publicUrl = supabase.storage.from('avatars').getPublicUrl(`avatar-${username}`);
    return publicUrl.data.publicUrl;
  };
  const updateAccount = async () => {
    if (file) {
      const publicUrl = await uploadNewAvatar();
      const { data, error } = await supabase.from('users').update({ username, avatar_url: publicUrl }).eq('id', USER.id);
      if (error) return setError(error.message);
      dispatch(authActions.updateAccount({ username: username, avatar_url: publicUrl }));

      alert('Account updated!');
    } else {
      const { data, error } = await supabase.from('profiles').update({ username: username }).eq('id', USER.id);
      if (error) return setError(error.message);
      dispatch(authActions.updateAccount({ username: username }));
      alert('Account updated!');
    }
  };
  useEffect(() => {
    const generatePreview = () => {
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    };
    if (file) {
      generatePreview();
    }
  }, [file]);
  return { error, avatarPreview, accountRef, avatarImgUrl, file, username, loading, password, setError, setAvatarPreview, setAvatarImgUrl, setFile, setUsername, setLoading, setPassword, handleFileChange, handleImageClick, handleInputChange, updateAccount };
};
export default useAccount;
