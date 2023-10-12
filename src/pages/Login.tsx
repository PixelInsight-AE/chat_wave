import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { useEffect, useState } from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const Login = () => {
  const { login, handleInput, email, password, error } = useLogin();
  const [cookieNotification, setCookieNotification] = useState(false);

  const handleCookieNotification = () => {
    localStorage.setItem('cookieNotification', 'true');
    setCookieNotification(true);
  };

  useEffect(() => {
    const cookieNotificationValue = localStorage.getItem('cookieNotification');
    if (cookieNotificationValue) {
      setCookieNotification(true);
    }
  }, []);

  return (
    <>
      <Header />

      <div className="login">
        <section className="login__title">
          <h1>Chat Wave</h1>

          <img src="/assets/svg/chatWave.svg" alt="" />
        </section>

        <form onSubmit={login}>
          <p className="login__login-to-account">Login to Your Account.</p>

          {error && <p className="login__error">{error}</p>}

          <input type="email" name="email" placeholder="      Email" onChange={handleInput} value={email} style={{ backgroundImage: 'url(/assets/svg/email-input.svg', backgroundRepeat: 'no-repeat', backgroundPosition: '6px 50%' }} />

          <input type="password" name="password" placeholder="      Password" onChange={handleInput} value={password} style={{ backgroundImage: 'url(/assets/svg/password-input.svg', backgroundRepeat: 'no-repeat', backgroundPosition: '10px 50%' }} />

          <Link className="login__forgot-password" to="/forgot-password">
            Forgot Password?
          </Link>

          <button type="submit">Login</button>

          <p className="login__dont-have-account">
            Don't have an account?{' '}
            <Link className="login__dont-have-account--link" to="/register">
              SignUp
            </Link>
          </p>
        </form>
        {!cookieNotification && (
          <div className="login__cookie-notification">
            <p>
              This website uses cookies to ensure you get the best experience on our website.{' '}
              <span className="login__cookie-notification--button" onClick={handleCookieNotification}>
                Accept
              </span>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Login;
