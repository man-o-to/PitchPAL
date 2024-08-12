import { CSSProperties } from 'react';
import { motion } from 'framer-motion';

const largeMiddle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '600px',
  height: '600px',
};

const smallTop: CSSProperties = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  width: '230px',
  height: '230px',
  transform: 'translate(-50%, 0)',  // Centers horizontally
};

export default function AIStateIndicator({
  isLarge = false,
}: {
  isLarge?: boolean;
}) {
  const style = isLarge ? largeMiddle : smallTop;

  return (
    <motion.div
      style={style}
      animate={{
        width: isLarge ? '600px' : '230px',
        height: isLarge ? '600px' : '230px',
        top: isLarge ? '0%' : '-53%',
        left: '50%',
        transform: isLarge
          ? 'translate(0%, 0%)'
          : 'translate(-50%, 0)', // Adjusted for horizontal centering
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <img src="/Subtract.svg" alt="Glowing Circle" />
    </motion.div>
  );
}