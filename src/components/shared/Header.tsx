import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
};

const DropDownNav = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navigation">
      <img className="navigation__hamburger" onClick={() => setIsOpen(!isOpen)} src="/assets/svg/hamberger.svg" alt="" />
      <motion.ul className="navigation__dropdown-container" initial="closed" animate={isOpen ? 'open' : 'closed'} variants={variants} transition={{ duration: 0.5 }}>
        {items.map((item, index) => (
          <Link key={index} to={item.path} className="navigation__dropdown-link">
            {item.name}
          </Link>
        ))}
      </motion.ul>
    </nav>
  );
};
const Header = () => {
  const id = useSelector((state) => state.auth.id);
  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <img className="header__logo" src="/public/vite.svg" alt="" />
        <h1 className="header__title">Chat Wave</h1>
      </div>
      <DropDownNav
        items={[
          { name: 'Favourites', path: '/Favourites' },
          { name: 'Friends', path: '/Friends' },
          { name: 'Rooms', path: `/MyRooms/${id}` },
          { name: 'Settings', path: '/Settings' },
        ]}
      />
    </header>
  );
};

export default Header;

/***
 * ? Usage example:
 const PixelHeader = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div id="test-header">
      <DropDownNav title="Menu" items={navItems} />
      <SideNav items={navItems} />
    </div>
  );
};
 */
