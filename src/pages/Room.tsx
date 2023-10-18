import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../config/supabase.js';
import Header from '../components/shared/Header.js';
import Footer from '../components/shared/Footer.js';
import SideNav from '../components/menu/Sidenav.js';
import useConverse from '../hooks/useConverse.js';
const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const { message, handleInput, sendMessage } = useConverse(id);
  //scroll bottom chat area
  useEffect(() => {
    const chatArea = document.querySelector('.chat-area');
    chatArea.scrollTop = chatArea.scrollHeight;
  }, [conversations]);

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
  const fakeUserData = [
    { username: 'John Doe', avatar_url: 'https://avatars.githubusercontent.com/u/84065711?v=4' },
    {
      username: 'Jan Doe',
      avatar_url: 'https://avatars.githubusercontent.com/u/84065711?v=4',
    },
    {
      username: 'Jeen Doe',
      avatar_url: 'https://avatars.githubusercontent.com/u/84065711?v=4',
    },
  ];
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
        <div className="in-chat"></div>
      </div>
      <Footer />
    </>
  );
};
export default Room;
