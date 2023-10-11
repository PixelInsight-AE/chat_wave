import { motion } from 'framer-motion';
import './PixelCard.scss';

const PixelCard = (props) => {
  const { id } = props;
  return (
    <div className="pixel-card">
      <motion.div id={id} className="pixel-motion" initial={{ width: '40%' }} whileHover={{ width: '100%' }} transition={{ duration: 0.5 }}>
        {props.children}
      </motion.div>
    </div>
  );
};

export default PixelCard;
