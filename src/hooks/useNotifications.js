import supabase from '../config/supabase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const useNotifications = () => {
  const profileId = useSelector((state) => state.auth.id);
  console.log(profileId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const { data, error } = await supabase.from('notifications').select('*,notification:notification_data').eq('profile_id', profileId);
    if (error) return setError(error.message);
    console.log(data);
    const unreadNotifications = data.filter((notification) => notification.read === false);
    setNotifications(unreadNotifications);
  };
  useEffect(() => {
    const channel = supabase
      .channel(`notifications:${profileId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
        console.log(payload);
        fetchNotifications();
      })
      .subscribe();
    fetchNotifications();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return { error, loading, notifications, fetchNotifications };
};
export default useNotifications;
