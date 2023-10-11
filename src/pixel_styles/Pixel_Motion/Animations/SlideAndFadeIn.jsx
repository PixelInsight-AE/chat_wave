import { motion } from "framer-motion";

const SlideAndFadeIn = ({
  axis,
  amount,
  duration,
  delay,
  className,
  children,
}) => {
  const initial = { [axis]: amount, opacity: 0 };
  const animate = { [axis]: 0, opacity: 1 };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: duration, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideAndFadeIn;
