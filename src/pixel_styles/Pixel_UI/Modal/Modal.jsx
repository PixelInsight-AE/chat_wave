import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Modal.scss';

const Backdrop = ({ isOpen, onClick }) => {
  return ReactDOM.createPortal(
    <AnimatePresence>{isOpen && <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="backdrop" onClick={onClick}></motion.div>}</AnimatePresence>,
    document.getElementById('backdrop-hook'),
  );
};

const ModalContent = ({ isOpen, onClick, children }) => {
  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="modal" onClick={onClick}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};
const Modal = ({ isOpen, toggleModal, children }) => {
  return (
    <div id="modal">
      {isOpen && <Backdrop isOpen={isOpen} onClick={toggleModal} />}
      <ModalContent isOpen={isOpen}>{children}</ModalContent>
    </div>
  );
};

export default Modal;

/**
 * USAGE
 * ! Import the Modal component and use it as a wrapper for the content you want to display in the modal
 * ! The Modal component takes in two props: isOpen and toggleModal
 * ? use the isOpen and toggleModal props to control the modal from your parent component
 */
