import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import { useState } from 'react';
import useAccount from '../hooks/useAccount';
import { Link, useNavigate } from 'react-router-dom';
const Account = () => {
  const { avatarImgUrl, avatarImg, accountRef, handleFileChange, handleImageClick } = useAccount();

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="account">
        <h1 className="account--title">Update Your Account Settings.</h1>
        <form>
          <input type="text" name="username" placeholder="Your Chat Wave Username" />
          <section className="avatar-wrapper">
            <h3 className="avatar-wrapper--title">Your Avatar.</h3>

            <input onChange={handleFileChange} ref={accountRef} type="file" hidden={true} name="avatar" accept="image/*" />
            {avatarImg ? (
              <img src={avatarImgUrl} alt="avatar" />
            ) : (
              <div className="avatar-wrapper--img-preview" onClick={handleImageClick}>
                + Image
              </div>
            )}
          </section>
          <button>Update Account</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </form>
      </div>
    </>
  );
};
export default Account;
