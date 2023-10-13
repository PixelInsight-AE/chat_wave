import SideNav from '../components/menu/Sidenav';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import useCreateRoom from '../hooks/useCreateRoom';
import { useEffect } from 'react';
const Create = () => {
  const { roomImgUrl, roomImg, fileInputRef, handleImageClick, handleFileInput, handleInput, roomName, roomType, loading, error, roomDescription, roomCapacity, createRoom } = useCreateRoom();
  useEffect(() => {
    console.log(roomName, roomType, roomDescription, roomCapacity);
  }, [roomName, roomType, roomDescription, roomCapacity]);
  return (
    <div className="create">
      <section className="create__main">
        <h2 className="create__title">Create a new room.</h2>
        {error && <p className="create__error">{error}</p>}
        <h3 className="create__sub-title">Room Picture.</h3>
        <input onChange={handleFileInput} ref={fileInputRef} type="file" name="room-image" accept="image/*" hidden={true} disabled={loading} />
        {roomImg ? (
          <img className="create__image" src={roomImgUrl} alt="room" />
        ) : (
          <div onClick={handleImageClick} className="create__input">
            + Image
          </div>
        )}

        <section className="create__details">
          <input onChange={handleInput} type="text" name="roomName" placeholder="Room Name." value={roomName} />
          <input onChange={handleInput} type="text" name="roomDescription" placeholder="Room Description." value={roomDescription} />
          <section className="create__max-users">
            <p>Max Users. (up to 30)</p>
            <select onChange={handleInput} name="roomCapacity" value={roomCapacity}>
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
            </select>
          </section>
          <section className="create__room-type-select">
            <p>Type?</p>
            <select onChange={handleInput} name="roomType" value={roomType}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </section>
        </section>
      </section>
      <section className="create__privacy-settings">
        <h3 className="create__privacy-settings--title">Private Room Settings.</h3>
        <p className="create__privacy-settings--invite">Invite Friends?</p>
        <div className="create__privacy-settings--list-of-friends">{/* <Friend /> */}</div>
        <button onClick={createRoom} className="create__button">
          Create Room!
        </button>
      </section>
    </div>
  );
};

const CreateRoom = () => {
  return (
    <>
      <Header />
      <div className="create-room">
        <SideNav />
        <Create />
      </div>

      <Footer />
    </>
  );
};
export default CreateRoom;
