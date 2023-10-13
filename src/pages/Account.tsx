import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import { useState } from 'react';
import useAccount from '../hooks/useAccount';
import { Link, useNavigate } from 'react-router-dom';
const Account = () => {
  const { avatarImgUrl, accountRef, handleFileChange, handleImageClick, username, handleInputChange, updateAccount, error } = useAccount();

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="account">
        <h1 className="account--title">Update Your Account Settings.</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateAccount();
          }}
        >
          {error && <p className="account--error">{error}</p>}
          <input type="text" name="username" placeholder="Your Chat Wave Username" onChange={handleInputChange} value={username} />
          <section className="avatar-wrapper">
            <h3 className="avatar-wrapper--title">Your Avatar.</h3>

            <input onChange={handleFileChange} ref={accountRef} type="file" hidden={true} name="avatar" accept="image/*" />
            {avatarImgUrl ? (
              <img onClick={handleImageClick} className="avatar-wrapper--img-preview" src={avatarImgUrl} alt="avatar" />
            ) : (
              <div className="avatar-wrapper--img-preview" onClick={handleImageClick}>
                + Image
              </div>
            )}
          </section>
          <button type="submit">Update Account</button>
        </form>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </>
  );
};
export default Account;
