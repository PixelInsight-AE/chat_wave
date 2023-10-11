import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const TopNav = ({ items }) => {
  const { scrollYProgress } = useScroll();
  const [isShown, setIsShown] = useState(true);
  const yRange = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const unsubscribe = yRange.onChange((v) => setIsShown(v <= 0));
    return () => unsubscribe();
  }, [yRange]);

  return (
    <motion.nav
      className="top-nav"
      initial={{ y: "-100%" }}
      animate={isShown ? { y: 0 } : { y: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      {items.map((item, index) => (
        <Link className="top-nav-item" key={index} to={item.path}>
          {item.name}
        </Link>
      ))}
    </motion.nav>
  );
};

export { TopNav };
