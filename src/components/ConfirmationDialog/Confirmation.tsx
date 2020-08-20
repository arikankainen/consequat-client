import React, { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';

const BackDrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1002;
`;

const Container = styled.div`
  position: fixed;
  width: 300px;
  height: 150px;
  top: 200px;
  left: 200px;
  background-color: #777;
  z-index: 1002;
`;

const Confirmation = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen}>
      <BackDrop>
        <Container>
          Jeps
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={() => setIsOpen(false)}>OK</button>
        </Container>
      </BackDrop>
    </Modal>
  );
};

export default Confirmation;