import { Link } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import useSignUp from '../hooks/useSignUp';
const SignUp = () => {
  const { error, handleInput, handleSignup, username, email, password, passwordConfirm } = useSignUp();
  return (
    <>
      <Header />
      <div className="signup">
        <section className="signup__title">
          <h1>Chat Wave</h1>
          <img src="/assets/svg/chatWave.svg" alt="" />
        </section>

        <form onSubmit={handleSignup}>
          {error && <p className="signup__error">{error}</p>}

          <input type="text" name="username" placeholder="      Username" onChange={handleInput} value={username} style={{ backgroundImage: 'url(/assets/svg/user-input.svg', backgroundRepeat: 'no-repeat', backgroundPosition: '10px 50%' }} />

          <input type="email" name="email" placeholder="      Email" onChange={handleInput} value={email} style={{ backgroundImage: 'url(/assets/svg/email-input.svg', backgroundRepeat: 'no-repeat', backgroundPosition: '6px 50%' }} />

          <input type="password" name="password" placeholder="      Password" onChange={handleInput} value={password} style={{ backgroundImage: 'url(/assets/svg/password-input.svg', backgroundRepeat: 'no-repeat', backgroundPosition: '10px 50%' }} />

          <input type="password" name="password-confirm" onChange={handleInput} placeholder="      Confirm Password" value={passwordConfirm} style={{ backgroundImage: 'url(/assets/svg/password-input.svg', backgroundRepeat: 'no-repeat', backgroundPosition: '10px 50%' }} />

          <p className="signup__terms-and-conditions">
            By Signing up you agree to our{' '}
            <Link className="signup__terms-and-conditions--link" to="/privacy-policy">
              Terms & Conditions
            </Link>
          </p>

          <button type="submit">Sign Up</button>

          <p className="signup__already-have-account">
            Already Have an Account?{' '}
            <Link className="signup__already-have-account--link" to="/">
              Login
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
};
export default SignUp;
