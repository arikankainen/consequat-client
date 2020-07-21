import React, { useEffect, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }): ReactPortal | null => {
  const element = document.createElement('div');

  useEffect(() => {
    modalRoot?.appendChild(element);

    return () => {
      modalRoot?.removeChild(element);
    };
  }, [element]);

  if (!isOpen) return null;
  return (createPortal(<>{children}</>, element));
};

export default Modal;