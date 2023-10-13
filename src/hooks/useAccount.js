import { useEffect, useState, useRef } from 'react';
const useAccount = () => {
  const [error, setError] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const accountRef = useRef(null);
  const [avatarImgUrl, setAvatarImgUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);

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

  useEffect(() => {
    const generatePreview = () => {
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    };
    if (file) {
      generatePreview();
    }
  }, [file]);
  return { error, avatarPreview, accountRef, avatarImgUrl, file, username, loading, password, setError, setAvatarPreview, setAvatarImgUrl, setFile, setUsername, setLoading, setPassword, handleFileChange, handleImageClick, handleInputChange };
};
export default useAccount;
