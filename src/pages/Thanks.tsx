import { Link } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';

const Thanks = () => {
  return (
    <>
      <Header />
      <div className="thanks">
        <section className="thanks__title">
          <h1>Chat Wave</h1>
          <img src="/assets/svg/chatWave.svg" alt="" />
        </section>
        <h2>Thanks For Signing Up! Please check your email to confirm your account.</h2>

        <Link to="/" className="thanks__link">
          To Login
        </Link>
      </div>
      <Footer />
    </>
  );
};
export default Thanks;
