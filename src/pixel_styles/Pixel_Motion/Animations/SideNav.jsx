/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./SideNav.scss";

const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const SideNav = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="side-nav-container">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"} index
      </button>
      <motion.aside
        className="side-nav"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {items.map((item, index) => (
          <Link className="side-nav-item" key={index} to={item.path}>
            {item.name}
          </Link>
        ))}
      </motion.aside>
    </div>
  );
};

export default SideNav;

/***
 * ? Usage:
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

// ? Individual pieces can be combined into one Navbar component:
