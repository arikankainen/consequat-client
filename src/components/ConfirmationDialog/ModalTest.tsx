import React from 'react';

interface Modal {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<Modal> = ({ isOpen, children }) => {

  if (!isOpen) return null;
  return (<>{children}</>);
};

export default Modal;