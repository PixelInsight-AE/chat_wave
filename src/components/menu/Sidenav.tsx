import { useSelector } from 'react-redux';
import useNotifications from '../../hooks/useNotifications.js';
import { Link } from 'react-router-dom';
import RoomsList from './RoomsList.js';
import { useEffect, useState } from 'react';
import Modal from '../../pixel_styles/Pixel_UI/Modal/Modal.jsx';
const SideNav = () => {
  const [selected, setSelected] = useState('rooms'); // ['rooms', 'chats'
  const USER = useSelector((state) => state.auth);
  const { notifications } = useNotifications();
  const [isOpen, setIsOpen] = useState(false); // ['rooms', 'chats'
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="aside-nav">
      <section style={{ cursor: 'pointer' }} onClick={toggleModal} className="aside-nav__user-wrapper">
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
      {isOpen && (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <div className="notification-menu">
            {notifications &&
              notifications.map((notification) => {
                const { owner, room_name, room_img, friend_avatar, friend_username } = notification.notification;
                console.log(notification, 'notification');
                if (notification.notification_type === 'room_invite') {
                  return (
                    <div className="notification-menu__notification">
                      <section>
                        <img src={room_img} alt="" />
                        <h3>{room_name}</h3>
                      </section>
                      <p>Your Invited! to join {room_name}</p>
                      <button>Join</button>
                    </div>
                  );
                }
                return (
                  <div className="notification-menu__notification">
                    <section>
                      <img src={friend_avatar} alt="" />
                      <h3>{friend_username}</h3>
                    </section>
                    <p>Wants To be your Friend!</p>
                    <button>Add</button>
                    <button>Remove</button>
                  </div>
                );
              })}
          </div>
        </Modal>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <div className="notification-menu">
            {notifications &&
              notifications.map((notification) => {
                const { owner, room_name, room_img, friend_avatar, friend_username } = notification.notification;
                console.log(notification, 'notification');
                if (notification.notification_type === 'room_invite') {
                  return (
                    <div className="notification-menu__notification">
                      <section>
                        <img src={room_img} alt="" />
                        <h3>{room_name}</h3>
                      </section>
                      <p>Your Invited! to join {room_name}</p>
                      <button>Join</button>
                    </div>
                  );
                }
                return (
                  <div className="notification-menu__notification">
                    <section>
                      <img src={friend_avatar} alt="" />
                      <h3>{friend_username}</h3>
                    </section>
                    <p>Wants To be your Friend!</p>
                    <button>Add</button>
                    <button>Remove</button>
                  </div>
                );
              })}
          </div>
        </Modal>
      )}
      <RoomsList selected={selected} />
      <Link to="/menu" className="aside-nav__main-menu-button">
        <img src="/assets/svg/back.svg" alt="" />
        <p>Main Menu</p>
      </Link>
    </aside>
  );
};
export default SideNav;
