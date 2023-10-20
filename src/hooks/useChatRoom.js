import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../config/supabase';
import InChat from '../components/chatroom/InChat';
import FriendsList from '../components/chatroom/FriendsList';
import { useSelector } from 'react-redux';
const useChatRoom = (room_id) => {
  const userId = useSelector((state) => state.auth.id);
  const [roomToken, setRoomToken] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [peopleInChat, setPeopleInChat] = useState([]);

  const fetchRoomToken = useCallback(async () => {
    try {
      const tokenData = await fetch(`http://localhost:3333/rtc/${room_id}/audience/uid/${userId}`);
      const token = await tokenData.json();
      setRoomToken(token.rtcToken);
    } catch {
      setError('Error getting token');
    }
  }, [room_id, userId]);

  const formatDateTime = (date) => {
    const d = new Date(date);
    const time = d.toLocaleTimeString('en-US');
    return `${d.toLocaleDateString()} ${time}`;
  };

  const fetchConversations = async () => {
    const { data, error } = await supabase.from('conversations').select('*, sender:sender_id(*)').eq('room_id', room_id);
    if (error) return setError(error.message);
    setConversations(data);
  };

  const fetchPeopleInChat = async () => {
    const { data, error } = await supabase.from('in_chat').select('*, users:profile_id(*)').eq('room_id', room_id);
    if (error) return setError(error.message);
    // console.table(data);
    setPeopleInChat(data);
  };
  const enterChat = async () => {
    const { data, error } = await supabase.from('in_chat').insert({
      profile_id: userId,
      room_id: room_id,
    });
    if (error) return setError(error.message);
    await fetchPeopleInChat();
  };
  const leaveChat = async () => {
    await supabase.from('in_chat').delete().eq('room_id', room_id).eq('profile_id', userId);
  };
  useEffect(() => {
    console.log(roomToken);
  }, [roomToken]);
  fetchRoomToken();

  return { formatDateTime, conversations, error, fetchConversations, fetchPeopleInChat, peopleInChat, enterChat, leaveChat, roomToken };
};
export default useChatRoom;
