import SideNav from '../components/menu/Sidenav';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
const Create = () => {
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="create">
      <section className="create__main">
        <h2 className="create__title">Create a new room.</h2>
        <h3 className="create__sub-title">Room Picture.</h3>
        <input ref={fileInputRef} type="file" name="room-image" accept="image/*" hidden={true} />
        <div onClick={handleImageClick} className="create__input">
          {' '}
          + Image
        </div>
        <section className="create__details">
          <input type="text" name="room-name" placeholder="Room Name." />
          <input type="text" name="room-description" placeholder="Room Description." />
          <section className="create__max-users" style={{ display: 'flex', flexDirection: 'row' }}>
            <p>Max Users. (up to 30)</p>
            <select name="max-users" id="">
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </section>
          <section className="create__room-type-select" style={{ display: 'flex', flexDirection: 'row' }}>
            <p>Type?</p>
            <select name="room-type" id="">
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
        <button className="create__button">Create Room!</button>
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
