/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./DropDownNav.scss";

const variants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};

const DropDownNav = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      <motion.div
        className="drop-down-container"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {items.map((item, index) => (
          <Link key={index} to={item.path} className="drop-down-link">
            {item.name}
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default DropDownNav;

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
