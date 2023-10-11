import { motion, useScroll, useTransform } from "framer-motion";

const RevealOnScroll = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);

  return <motion.div style={{ opacity }}>{children}</motion.div>;
};

const ScaleOnScroll = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  return <motion.div style={{ scale }}>{children}</motion.div>;
};

const RotateOnScroll = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return <motion.div style={{ rotate }}>{children}</motion.div>;
};

const ParallaxImage = ({ children, speed = 0.1 }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -speed * 500]);

  return <motion.div style={{ y }}>{children}</motion.div>;
};

const SkewOnScroll = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const skew = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return <motion.div style={{ skew }}>{children}</motion.div>;
};

const ColorChangeOnScroll = ({
  children,
  startColor = "#ff0000",
  endColor = "#0000ff",
}) => {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    [startColor, endColor]
  );

  return <motion.div style={{ backgroundColor }}>{children}</motion.div>;
};

export {
  ScaleOnScroll,
  RevealOnScroll,
  ParallaxImage,
  RotateOnScroll,
  SkewOnScroll,
  ColorChangeOnScroll,
};
