import React from 'react';

interface Modal {
  children: React.ReactNode;
}

const Modal: React.FC<Modal> = ({ children }) => {
  return <>{children}</>;
};

export default Modal;
