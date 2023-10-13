import supabase from '../../config/supabase.js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const RoomsList = ({ selected }) => {
  const [rooms, setRooms] = useState([]);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    if (selected === 'rooms') {
      const fetchRooms = async () => {
        const { data, error } = await supabase.from(`rooms`).select('*');
        if (error) {
          console.log(error);
        } else {
          setRooms(data);
        }
      };
      fetchRooms();
    }
    const fetchChats = async () => {
      const { data, error } = await supabase.from(`chats`).select('*, participant_1(*), participant_2(*)');
      if (error) {
        console.log(error);
      }
      setChats(data);
    };
    fetchChats();
  }, [selected]);

  if (selected === 'chats') {
    return (
      <ul className="room-map">
        {chats.map((chat) => (
          <li className="room-map__chat" key={chat.id}>
            <Link to={`/chat/${chat.id}`} className="room-map__chat--link">
              <img src={chat.chat_img} alt="" />
              <h3 className="room-map__chat--name">{chat.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="room-map">
      {rooms.map((room) => (
        <Link to={`/room/${room.id}`} className="room-map__room--link">
          <li className="room-map__room" key={room.id}>
            <img src={room.room_img} alt="" />
            <h3 className="room-map__room--name">{room.name}</h3>
            <p className="room-map__room--capacity">{`${room.capacity}/30`}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default RoomsList;
