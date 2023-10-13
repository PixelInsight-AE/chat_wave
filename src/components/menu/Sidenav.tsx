import { useSelector } from 'react-redux';
import useNotifications from '../../hooks/useNotifications.js';
import { Link } from 'react-router-dom';
import RoomsList from './RoomsList.js';
import { useEffect, useState } from 'react';
const SideNav = () => {
  const [selected, setSelected] = useState('rooms'); // ['rooms', 'chats'
  const USER = useSelector((state) => state.auth);
  const { notifications } = useNotifications();

  return (
    <aside className="aside-nav">
      <section className="aside-nav__user-wrapper">
        <img src={USER.avatar_url} alt="" />
        <p className="aside-nav__user-wrapper--username">{USER.username}</p>
        <div className="aside-nav__user-wrapper--notification">{notifications.length}</div>
      </section>

      <Link className="aside-nav__new-room" to="/new-room">
        <p>New Room</p>
        <img src="/assets/svg/plus.svg" alt="" />
      </Link>
      <select
        onChange={(e) => {
          setSelected(e.target.value);
        }}
        name="aside-nav__select"
        className="aside-nav__select"
      >
        <option value="rooms">Rooms</option>
        <option value="chats">Chats</option>
      </select>
      <RoomsList selected={selected} />
      <Link to="/menu" className="aside-nav__main-menu-button">
        <img src="/assets/svg/back.svg" alt="" />
        <p>Main Menu</p>
      </Link>
    </aside>
  );
};
export default SideNav;
