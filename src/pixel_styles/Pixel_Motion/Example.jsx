import { motion } from 'framer-motion';

const PixelSlideInLeft = (props) => {
  const { id } = props;
  return (
    <motion.div id={id} initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
      {props.children}
    </motion.div>
  );
};

export default PixelSlideInLeft;
