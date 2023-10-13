import supabase from '../../config/supabase.js';
import { useEffect, useState } from 'react';
import { HomeScreen, FriendsScreen, RecentsScreen, RoomsScreen, FavouritesScreen } from './Tabs.js';
const MainMenu = () => {
  const [tab, setTab] = useState('');
  const setView = () => {
    switch (tab) {
      case 'favorites':
        return <FavouritesScreen />;
      case 'friends':
        return <FriendsScreen />;
      case 'recents':
        return <RecentsScreen />;
      case 'rooms':
        return <RoomsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="main-menu">
      <div className="main-menu__list">
        <ul className="main-menu__list--items">
          <li onClick={(e) => setTab(e.target.id)} id="recents">
            Recents
          </li>
          <li onClick={(e) => setTab(e.target.id)} id="favorites">
            Favourites
          </li>
          <li onClick={(e) => setTab(e.target.id)} id="rooms">
            Your Rooms
          </li>
          <li onClick={(e) => setTab(e.target.id)} id="friends">
            Friends
          </li>
        </ul>
      </div>
      <div className="main-menu__content">{setView()}</div>
    </div>
  );
};
export default MainMenu;
