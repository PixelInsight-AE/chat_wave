import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <section className="home-screen">
      <h1 className="home-screen__title">New To Chat Wave?</h1>

      <Link to="/new-room" className="home-screen__start-a-room">
        Try <span className="home-screen__start-a-room--start">Starting A Chat Room!</span>
      </Link>
      <p className="home-screen__or">Or</p>
      <Link to="/" className="home-screen__join-a-room">
        Join An Existing Room!
      </Link>
    </section>
  );
};
const FriendsScreen = () => {
  return (
    <section className="friend-screen">
      <h1>Friend</h1>
      <p>Friend List</p>
    </section>
  );
};
const RecentsScreen = () => {
  return (
    <section className="recents-screen">
      <h1>Recent</h1>
      <p>Recents</p>
    </section>
  );
};
const RoomsScreen = () => {
  return (
    <section className="rooms-screen">
      <h1>Rooms</h1>
      <p>room Screen</p>
    </section>
  );
};
const FavouritesScreen = () => {
  return (
    <section className="favorites-screen">
      <h1>Favourites</h1>
      <p>Favourites</p>
    </section>
  );
};

export { HomeScreen, FriendsScreen, RecentsScreen, RoomsScreen, FavouritesScreen };
