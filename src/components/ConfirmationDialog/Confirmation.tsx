import React, { useState } from 'react';
import Modal from './Modal';
import {
  BackDrop,
  FloatingContainer,
  Container,
  Topic,
  Content,
  Button,
  WhiteButton,
  ButtonArea
} from './Styles';

const Confirmation = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen}>
      <BackDrop>
        <FloatingContainer>
          <Container>
            <Topic>Confirmation</Topic>
            <Content>
              Are you sure you want to upload all pictures? Are you sure you want to upload all pictures? Are you sure you want to upload all pictures?
            </Content>
            <ButtonArea>
              <WhiteButton onClick={() => setIsOpen(false)}>Cancel</WhiteButton>
              <Button onClick={() => setIsOpen(false)}>OK</Button>
            </ButtonArea>
          </Container>
        </FloatingContainer>
      </BackDrop>
    </Modal>
  );
};

export default Confirmation;