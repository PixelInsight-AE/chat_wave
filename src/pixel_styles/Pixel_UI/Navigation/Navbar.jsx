import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.scss";

// ! ONLY EVER MODIFY NAVLINKS COMPONENT
const NavLinks = () => {
  return (
    <ul>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/search">Search&#x1F50D;</Link>
      </li>
      <li>
        <Link to="/articlese">Browse</Link>
      </li>
    </ul>
  );
};

const Backdrop = ({ isOpen, onClick }) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="backdrop"
          onClick={onClick}
        ></motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("backdrop-hook")
  );
};

const SideNavigation = ({ isOpen, onClick }) => {
  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="side-drawer"
          onClick={onClick}
        >
          <nav id="mobile-nav">
            <NavLinks />
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("sidenav-hook")
  );
};

const Navbar = () => {
  const [sideNavIsOpen, setSideNavIsOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div id="navbar">
      {sideNavIsOpen && (
        <Backdrop isOpen={sideNavIsOpen} onClick={toggleSideNav} />
      )}
      <SideNavigation isOpen={sideNavIsOpen} onClick={toggleSideNav} />
      <nav id="desktop-nav">
        <button className="burger-menu" onClick={toggleSideNav}>
          <span />
          <span />
          <span />
        </button>
        <Link to="/">
          <h1>TransMeDown </h1>
        </Link>
        <NavLinks type="desktop" />
      </nav>
    </div>
  );
};

export { Navbar };

/**
 * ! Requires a div with a id of sidenav and backdrop in index.html
 *
 */
