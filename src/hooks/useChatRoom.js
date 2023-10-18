import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../config/supabase';
import InChat from '../components/chatroom/InChat';
import FriendsList from '../components/chatroom/FriendsList';
const useChatRoom = (id) => {
  const [room, setRoom] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [inChat, setInChat] = useState(true);

  const inChatSwitch = () => {
    switch (inChat) {
      case true:
        return <InChat />;
      case false:
        return <FriendsList />;
      default:
        return <InChat />;
    }
  };

  const handleInChatChange = (e) => {
    if (e.target.id === 'inChat') {
      setInChat(true);
    }
    if (e.target.id === 'friends') {
      setInChat(false);
    }
  };

  const formatDateTime = (date) => {
    const d = new Date(date);
    const time = d.toLocaleTimeString('en-US');
    return `${d.toLocaleDateString()} ${time}`;
  };

  const fetchRoom = async () => {
    const data = await supabase.from('rooms').select('*').eq('id', id);
    setRoom(data);
  };
  const fetchConversations = async () => {
    const { data, error } = await supabase.from('conversations').select('*, sender:sender_id(*)').eq('room_id', id);
    if (error) return setError(error.message);
    console.log(data);
    setConversations(data);
  };

  useEffect(() => {
    const channel = supabase
      .channel(`room:${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'conversations' }, (payload) => {
        console.log(payload);
        fetchConversations();
      })
      .subscribe();
    fetchRoom();

    fetchConversations();
    return () => {
      channel.unsubscribe();
    };
  }, [id]);

  return { inChatSwitch, formatDateTime, fetchRoom, room, conversations, error, inChat, setInChat, handleInChatChange };
};
export default useChatRoom;
