import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
/***
 * ! This MotionWrapper component accepts a children prop to allow it to wrap any content, as well as transition and reducedMotion props that can be passed down to the MotionConfig component. The transition prop allows you to define a new default transition for all child motion components. The reducedMotion prop lets you set a site-wide policy for handling reduced motion - it can be set to "user", "always", or "never"​.
 */
const MotionWrapper = ({ children, transition, reducedMotion }) => (
  <MotionConfig transition={transition} reducedMotion={reducedMotion}>
    {children}
  </MotionConfig>
);

// ! Specify the transition prop on the MotionWrapper.
const SlideIn = ({ children }) => {
  const variants = {
    hidden: { x: "-100vw" },
    visible: { x: 0 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      {children}
    </motion.div>
  );
};

const ScaleOnScroll = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  return <motion.div style={{ scale }}>{children}</motion.div>;
};

export { MotionWrapper, SlideIn, ScaleOnScroll };
