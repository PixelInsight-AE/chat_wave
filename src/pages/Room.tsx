import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../config/supabase.js';
import Header from '../components/shared/Header.js';
import Footer from '../components/shared/Footer.js';
import SideNav from '../components/menu/Sidenav.js';
import useConverse from '../hooks/useConverse.js';
import InChat from '../components/chatroom/InChat.js';
import FriendsList from '../components/chatroom/FriendsList.js';
import useChatRoom from '../hooks/useChatRoom.js';
import { useSelector } from 'react-redux';
const Room = () => {
  const { id } = useParams();
  const [peopleInChat, setPeopleInChat] = useState([]);
  const userId = useSelector((state) => state.auth.id);

  const [room, setRoom] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [inChat, setInChat] = useState(true);
  const { message, handleInput, sendMessage } = useConverse(id);

  const formatDateTime = (date) => {
    const d = new Date(date);
    const time = d.toLocaleTimeString('en-US');
    return `${d.toLocaleDateString()} ${time}`;
  };

  const fetchRoom = async () => {
    const data = await supabase.from('rooms').select('*, conversations(*),in_chat(*)').eq('id', id);
    console.log(data.data[0], 'data');
    setRoom(data);
  };

  const fetchConversations = async () => {
    const { data, error } = await supabase.from('conversations').select('*, sender:sender_id(*)').eq('room_id', id);
    if (error) return setError(error.message);
    setConversations(data);
  };

  const fetchPeopleInChat = async () => {
    const { data, error } = await supabase.from('in_chat').select('*, users:profile_id(*)').eq('room_id', id);
    if (error) return setError(error.message);

    setPeopleInChat(data);
  };
  const enterChat = async () => {
    const { data, error } = await supabase.from('in_chat').insert({
      profile_id: userId,
      room_id: id,
    });
    if (error) return setError(error.message);
    await fetchPeopleInChat();
  };
  const leaveChat = async () => {
    await supabase.from('in_chat').delete().eq('room_id', id).eq('profile_id', userId);
  };

  useEffect(() => {
    fetchRoom();
    fetchConversations();
    enterChat();
    const channel = supabase
      .channel(`room:${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'conversations' }, () => {
        fetchConversations();
      })
      .subscribe();

    return () => {
      leaveChat();
      channel.unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    const chatArea = document.querySelector('.chat-area');
    chatArea.scrollTop = chatArea.scrollHeight;
  }, [conversations]);

  const inChatSwitch = () => {
    switch (inChat) {
      case true:
        return <InChat peopleInChat={peopleInChat} />;
      case false:
        return <FriendsList />;
      default:
        return <InChat peopleInChat={peopleInChat} />;
    }
  };

  return (
    <>
      <Header />
      <div className="room">
        <SideNav />
        <div className="chat-room">
          <section className="chat-room__header">
            <section className="chat-room__header--bookmark">
              <img src="/assets/svg/bookmark.svg" alt="" />

              <h1 className="chat-room__header--name">{room && room.data[0].name}</h1>
            </section>
            <p className="chat-room__header--capacity">{room && room.data[0].capacity}/30</p>
          </section>
          <ul className="chat-area">
            {conversations ? (
              conversations.map((conversation) => {
                return (
                  <li className="chat-area__message">
                    <section className="chat-area__message--wrapper">
                      <img
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          marginRight: '10px',
                        }}
                        src={conversation.sender.avatar_url}
                        alt=""
                      />
                      <p className="chat-area__message--name">{conversation.sender.username}</p>
                      <p className="chat-area__message--time">{formatDateTime(conversation.sent_at)}</p>
                    </section>
                    <p className="chat-area__message--text">{conversation.message}</p>
                  </li>
                );
              })
            ) : (
              <p>No messages yet</p>
            )}
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="chat-room__input"
          >
            <input type="text" placeholder="Express yourself" onChange={handleInput} value={message} />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="in-chat">
          <section className="in-chat__header">
            <button onClick={() => setInChat(true)}>inchat</button> <button onClick={() => setInChat(false)}>friends</button>
          </section>
          <section className={inChat ? 'in-chat__in-chat' : 'in-chat__friends-list'}>{inChatSwitch()}</section>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Room;
