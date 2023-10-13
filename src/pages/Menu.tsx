import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import SideNav from '../components/menu/Sidenav';
import MainMenu from '../components/menu/MainMenu';
const Menu = () => {
  return (
    <>
      <Header />
      <div className="menu">
        <SideNav />
        <MainMenu />
      </div>
      <Footer />
    </>
  );
};
export default Menu;
